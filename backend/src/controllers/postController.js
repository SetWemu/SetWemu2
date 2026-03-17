import { supabase } from '../config/db.js';

// 1. Create a new social post
export const createPost = async (req, res) => {
    try {
        // We expect userId and content, and optionally an eventId
        const { userId, content, eventId } = req.body;

        const { data, error } = await supabase
            .from('posts')
            .insert([{ 
                user_id: userId, 
                content: content,
                event_id: eventId || null
            }])
            .select();

        if (error) throw error;

        res.status(201).json({ success: true, data: data[0] });
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ success: false, message: "Failed to create post." });
    }
};

// 2. Fetch the timeline feed
export const getFeed = async (req, res) => {
    try {
        // Fetch posts and explicitly join the profiles table using the author relationship
        const { data, error } = await supabase
            .from('posts')
            .select(`
                id,
                content,
                user_id,
                event_id,
                profiles!posts_user_id_fkey ( id, username, full_name, role )
            `)
            .order('id', { ascending: false }); // Highest ID = newest post

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Get Feed Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch social feed." });
    }
};