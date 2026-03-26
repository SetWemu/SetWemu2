import { supabase } from '../config/db.js';

/**
 * Handles User Signup
 * Creates a record in Supabase Auth AND the 'profiles' table.
 */
export const signup = async (req, res) => {
    const { email, password, fullName, role } = req.body;
    try {
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName, role: role } }
        });

        // ADD THIS: Log the error if auth fails
        if (authError) {
            console.error('SUPABASE AUTH ERROR:', authError);
            return res.status(400).json({ error: authError.message });
        }

        // --- NEW: Create Profile Record ---
        // This ensures every new account has an entry in the 'profiles' table immediately.
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ 
                id: data.user.id, 
                email: email, // Recording the email in the profiles table
                full_name: fullName || 'New User',
                username: `user_${data.user.id.substring(0, 5)}`,
                created_at: new Date()
            }]);

        if (profileError) {
            console.error('Error creating profile for new user:', profileError.message);
            // We don't necessarily block signup if profile creation fails, 
            // as the self-heal in getProfile will catch it later.
        }

        res.status(201).json({ message: 'Success', user: data.user });
    } catch (err) {
        console.error('SERVER CRASH ERROR:', err); // Log the full object, not just .message
        res.status(500).json({ error: 'Server error during signup' });
    }
};

/**
 * Handles User Login
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Authenticate with Supabase Auth
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 2. Update the last_login timestamp in your 'profiles' table
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ last_login: new Date() })
            .eq('id', data.user.id);

        if (updateError) {
            console.error('Error updating last login:', updateError.message);
            
            // SELF-HEAL: If update failed because profile is missing, create it
            if (updateError.code === 'PGRST116' || updateError.message.includes('0 rows')) {
                console.log(`[Self-Heal] Profile missing for ${data.user.id} during login. Creating...`);
                await supabase.from('profiles').insert([{
                    id: data.user.id,
                    email: data.user.email,
                    full_name: data.user.user_metadata?.full_name || 'User',
                    username: `user_${data.user.id.substring(0, 5)}`
                }]);
            }
        }

        // 3. Return success and user data
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || 'User'
            },
            token: data.session.access_token,
            session: data.session
        });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error during login' });
    }
};

/**
 * Refreshes an expired session using a refresh token
 */
export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken
        });

        if (error) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        res.status(200).json({
            message: 'Session refreshed',
            token: data.session.access_token,
            session: data.session
        });
    } catch (err) {
        console.error('Refresh error:', err.message);
        res.status(500).json({ error: 'Server error during token refresh' });
    }
};