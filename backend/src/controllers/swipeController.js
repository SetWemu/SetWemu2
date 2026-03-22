import { supabase } from '../config/db.js';

export const handleSwipe = async (req, res) => {
  const { userId, eventId, direction } = req.body;

  try {
    // 1. Record the swipe (Always happens)
    await supabase.from('swipes').insert({ user_id: userId, event_id: eventId, direction });

    // 2. Fetch the "Context" (Always happens)
    const { data: event } = await supabase.from('events').select('category_id').eq('id', eventId).single();
    const { data: profile } = await supabase.from('profiles').select('interests').eq('id', userId).single();

    let currentInterests = profile.interests || {};
    const categoryKey = `cat_${event.category_id}`;

    // 3. The "Brain" Logic (Handles both directions in 5 lines)
    if (direction === 'right') {
      currentInterests[categoryKey] = (currentInterests[categoryKey] || 0) + 1;
    } else {
      currentInterests[categoryKey] = Math.max(0, (currentInterests[categoryKey] || 0) - 0.2);
    }

    // 4. Save (Always happens)
    await supabase.from('profiles').update({ interests: currentInterests }).eq('id', userId);

    res.status(200).json({ message: `Learned: ${direction} on Category ${event.category_id}` });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Get user's interests and the list of events they've already swiped on
    const { data: profile } = await supabase.from('profiles').select('interests').eq('id', userId).single();
    const { data: swiped } = await supabase.from('swipes').select('event_id').eq('user_id', userId);
    
    const swipedIds = swiped?.map(s => s.event_id) || [];
    const interests = profile?.interests || {};

    // 2. Fetch all events that haven't been swiped yet
    let query = supabase.from('events').select('*');
    
    if (swipedIds.length > 0) {
      query = query.not('id', 'in', `(${swipedIds.join(',')})`);
    }

    const { data: events, error } = await query;
    if (error) throw error;

    // 3. The "Ranking Algorithm"
    // We sort the events in JavaScript based on the weights in the user's interests
    const rankedEvents = events.sort((a, b) => {
      const scoreA = interests[`cat_${a.category_id}`] || 0;
      const scoreB = interests[`cat_${b.category_id}`] || 0;
      return scoreB - scoreA; // Highest score first
    });

    res.status(200).json(rankedEvents.slice(0, 10)); // Return top 10
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};