import { supabase } from '../config/db.js';

export const createEvent = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            location, 
            google_maps_url, 
            date, 
            start_time, 
            image_url, 
            category_id, 
            host_id,
            ticket_tiers // Array of { name, price, capacity }
        } = req.body;

        // 1. Validation
        if (!host_id || !category_id || !ticket_tiers || ticket_tiers.length === 0) {
            return res.status(400).json({ error: "Host, Category, and at least one Ticket Tier are required." });
        }

        // 2. Insert the main Event
        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .insert([{ 
                title, 
                description, 
                location, 
                google_maps_url,
                date, 
                start_time, 
                image_url, 
                category_id, 
                host_id 
            }])
            .select()
            .single();

        if (eventError) throw eventError;

        const eventId = eventData.id;

        // 3. Prepare and Insert Ticket Tiers
        const tiersToInsert = ticket_tiers.map(tier => ({
            event_id: eventId,
            name: tier.name,
            price: tier.price || 0,
            capacity: tier.capacity || 100,
            sold_count: 0
        }));

        const { error: tierError } = await supabase
            .from('ticket_tiers')
            .insert(tiersToInsert);

        if (tierError) {
            // Logic Check: If tiers fail, we should technically delete the event 
            // to keep the DB clean, but for now, we'll just log the error.
            throw tierError;
        }

        res.status(201).json({ 
            message: "Event and Ticket Tiers created successfully", 
            event: eventData 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 1. FOR MANAGEMENT: Only shows events created by the logged-in user
export const getMyEvents = async (req, res) => {
    try {
        const userId = req.user.id; // Provided by the middleware

        const { data, error } = await supabase
            .from('events')
            .select(`
                *,
                category:categories!category_id (name),
                ticket_tiers (price, capacity, sold_count)
            `)
            .eq('host_id', userId) 
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Calculate totals for the management dashboard
        const processedData = data.map(event => {
            const tiers = event.ticket_tiers || [];
            const totals = tiers.reduce((acc, tier) => {
                acc.totalCapacity += (tier.capacity || 0);
                acc.totalRevenue += (tier.price || 0) * (tier.sold_count || 0);
                return acc;
            }, { totalCapacity: 0, totalRevenue: 0 });

            return {
                ...event,
                total_capacity: totals.totalCapacity,
                total_revenue: totals.totalRevenue
            };
        });

        res.status(200).json(processedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. FOR EXPLORE: Shows ALL events to everyone (No middleware needed)
export const getAllEvents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select(`
                *,
                category:categories!category_id (name)
            `)
            .order('created_at', { ascending: false });

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