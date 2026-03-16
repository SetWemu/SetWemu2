import { supabase } from '../config/db.js';

// 1. Create a new social post
export const createPost = async (req, res) => {
    try {
        // We expect the frontend to send who is posting, what they said, and an optional image
        const { profileId, content, imageUrl } = req.body;

        const { data, error } = await supabase
            .from('posts')
            .insert([{ 
                profile_id: profileId, 
                content: content, 
                image_url: imageUrl 
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
        // Fetch posts and automatically join the profiles table to get the author's details
        const { data, error } = await supabase
            .from('posts')
            .select(`
                id,
                content,
                image_url,
                created_at,
                profiles ( id, username, full_name, role )
            `)
            .order('created_at', { ascending: false }); // Newest posts first!

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Get Feed Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch social feed." });
    }
};