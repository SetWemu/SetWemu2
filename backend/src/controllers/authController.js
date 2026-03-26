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
            console.error('SUPABASE AUTH ERROR:', authError); // This is the key line
            return res.status(400).json({ error: authError.message });
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
        }

        // 3. Return success and user data
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.full_name
            },
            token: data.session.access_token,
            session: data.session
        });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error during login' });
    }
};