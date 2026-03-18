import { supabase } from '../config/db.js';

// Get all messages for a specific conversation
export const getMessages = async (req, res) => {
    const { conversationId } = req.params;
    
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Start a new conversation
export const createConversation = async (req, res) => {
    const { name, isGroupChat } = req.body; // Optional fields

    try {
        const { data, error } = await supabase
            .from('conversations')
            .insert([{ name: name || null, is_group_chat: isGroupChat || false }])
            .select()
            .single(); // .single() returns just the one object instead of an array

        if (error) throw error;
        
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send a new message
export const sendMessage = async (req, res) => {
    const { conversationId, senderId, content } = req.body;

    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([{ 
                conversation_id: conversationId, 
                sender_id: senderId, 
                content: content 
            }])
            .select()
            .single();

        if (error) throw error;
        
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};