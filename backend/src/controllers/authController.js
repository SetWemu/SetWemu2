import { supabase } from '../config/db.js';

/**
 * Handles User Login and updates 'last_login'
 * Requirement: Updates last_login in the profiles table
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
        // Note: Ensure your table is named 'profiles' (lowercase) in Supabase
        const { error: updateError } = await supabase
            .from('Profile')
            .update({ last_login: new Date() })
            .eq('id', data.user.id);

        if (updateError) {
            console.error('Error updating last login:', updateError.message);
            // We don't block the login if just the timestamp fails
        }

        // 3. Return success and user data to the React Native frontend
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                // Add other profile fields if needed
            },
            session: data.session
        });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error during login' });
    }
};