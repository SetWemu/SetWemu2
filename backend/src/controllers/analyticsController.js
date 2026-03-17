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

        // 2. Fetch all tickets, but join the ticket_tiers table to get the price and event_id
        const { data: ticketsData, error: ticketsError } = await supabase
            .from('tickets')
            .select(`
                id,
                ticket_tiers!inner (
                    price,
                    event_id
                )
            `)
            .eq('ticket_tiers.event_id', eventId);

        if (ticketsError) throw ticketsError;

        // 3. Calculate the totals
        const totalSales = ticketsData.length;
        const totalRevenue = ticketsData.reduce((sum, ticket) => {
            // Drill down into the joined table to grab the price
            const tierPrice = ticket.ticket_tiers?.price || 0;
            return sum + Number(tierPrice);
        }, 0);

        // 4. Send the analytics package back
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