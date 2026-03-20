import { supabase } from '../config/db.js';
import crypto from 'crypto';

export const createBooking = async (req, res) => {
  const { user_id, items } = req.body; 

  try {
    // 1. Fetch prices for all requested tiers to calculate total
    const tierIds = items.map(item => item.tier_id);
    const { data: tiers, error: tierError } = await supabase
      .from('ticket_tiers')
      .select('id, price')
      .in('id', tierIds);

    if (tierError || !tiers) throw new Error("Could not retrieve ticket prices.");

    // 2. Calculate Total Amount
    let calculatedTotal = 0;
    items.forEach(item => {
      const tier = tiers.find(t => t.id === item.tier_id);
      if (tier) {
        calculatedTotal += tier.price * item.quantity;
      }
    });

    // 3. Create the Booking Header with the CALCULATED total
    const { data: booking, error: bError } = await supabase
      .from('bookings')
      .insert({ 
        user_id, 
        total_amount: calculatedTotal, 
        status: 'confirmed' 
      })
      .select().single();

    if (bError) throw bError;

    // 4. Generate individual ticket rows
    const ticketRows = [];
    items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        ticketRows.push({
          booking_id: booking.id,
          tier_id: item.tier_id,
          qr_code_key: `SETWEMU-${crypto.randomUUID().split('-')[0].toUpperCase()}`,
          is_used: false
        });
      }
    });

    // 5. Bulk Insert tickets
    const { error: tError } = await supabase.from('tickets').insert(ticketRows);
    if (tError) throw tError;

    res.status(201).json({ 
      message: "Booking confirmed", 
      booking_id: booking.id, 
      total_paid: calculatedTotal 
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
    const { userId } = req.params;
  
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        total_amount,
        status,
        created_at,
        tickets (
          id,
          qr_code_key,
          is_used,
          ticket_tiers (
            name,
            price,
            events (title, date, location, image_url)
          )
        )
      `)
      .eq('user_id', userId);
  
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  };  