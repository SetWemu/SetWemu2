import { supabase } from '../config/db.js';

export const getEventAnalytics = async (req, res) => {
    try {
        const { eventId } = req.params;

        // 1. Fetch the total views for this specific event
        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .select('views')
            .eq('id', eventId)
            .single();

        if (eventError) throw eventError;

        // 2. Fetch all paid tickets for this event to calculate sales & revenue
        const { data: ticketsData, error: ticketsError } = await supabase
            .from('tickets')
            .select('price')
            .eq('event_id', eventId)
            .eq('status', 'paid'); // Assuming you track payment status!

        if (ticketsError) throw ticketsError;

        // 3. Calculate the totals
        const totalSales = ticketsData.length;
        const totalRevenue = ticketsData.reduce((sum, ticket) => sum + (ticket.price || 0), 0);

        // 4. Send the analytics package back to the frontend
        res.status(200).json({
            success: true,
            data: {
                eventId: eventId,
                views: eventData.views || 0,
                sales: totalSales,
                revenue: totalRevenue
            }
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch analytics data." });
    }
};