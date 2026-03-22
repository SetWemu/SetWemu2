import { supabase } from '../config/db.js';

export const createEvent = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            location, 
            date, 
            start_time, 
            price, 
            image_url, 
            category_id, 
            host_id 
        } = req.body;

        // Logic Flaw: Ensure IDs exist before inserting
        if (!host_id || !category_id) {
            return res.status(400).json({ error: "host_id and category_id are required." });
        }

        const { data, error } = await supabase
            .from('events')
            .insert([{ 
                title, 
                description, 
                location, 
                date, 
                start_time, 
                price, 
                image_url, 
                category_id, 
                host_id 
            }])
            .select();

        if (error) throw error;

        res.status(201).json({ message: "Event created successfully", event: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select(`
                *,
                category:categories!category_id (name),
                host:profiles!host_id (username)
            `); // "host:" renames the object for cleaner JSON

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          category:categories!category_id (name),
          host:profiles!host_id (username),
          ticket_tiers (*) 
        `) 
        .eq('id', id)
        .single();
  
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };