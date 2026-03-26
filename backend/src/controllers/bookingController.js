import { supabase } from '../config/db.js';
import crypto from 'crypto';

export const createBooking = async (req, res) => {
  const { user_id, items, payment_method } = req.body; 

  try {
    // 1. Fetch prices for all requested tiers
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

    // 3. Create the Booking Header
    const { data: booking, error: bError } = await supabase
      .from('bookings')
      .insert({ 
        user_id, 
        total_amount: calculatedTotal, 
        status: 'confirmed',
        payment_method: payment_method || 'DEMO_PURCHASE'
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
    console.error("Booking Creation Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
    const { userId } = req.params;
    console.log(`[DEBUG] Attempting to fetch bookings for userId: ${userId}`);
  
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
            id,
            name,
            price,
            events (
              id,
              title,
              date,
              location,
              image
            )
          )
        )
      `)
      .eq('user_id', userId);
  
    if (error) {
       console.error("[CRITICAL SUPABASE ERROR]:", JSON.stringify(error, null, 2));
       return res.status(400).json({ error: error.message });
    }
    
    console.log(`[DEBUG] Successfully fetched ${data?.length} bookings.`);
    res.json(data);
};