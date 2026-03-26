import { supabase } from '../config/db.js';

/**
 * handleSwipe
 * Logic: Records the interaction and adjusts the user's category weights.
 * Path: POST /api/swipe/interact
 */
export const handleSwipe = async (req, res) => {
  const { userId, eventId, direction } = req.body; // direction: 'right' (like) or 'left' (dislike)

  try {
    // 1. Prevent duplicate entries
    const { data: existing } = await supabase
      .from('swipes')
      .select('id')
      .match({ user_id: userId, event_id: eventId })
      .single();

    if (existing) {
      return res.status(400).json({ message: "You have already swiped on this event." });
    }

    // 2. Insert the swipe record
    const { error: swipeError } = await supabase.from('swipes').insert({
      user_id: userId,
      event_id: eventId,
      direction: direction
    });

    // If it's a duplicate, Supabase returns code '23505'
    if (swipeError) {
      if (swipeError.code === '23505') {
        return res.status(200).json({ message: "Already swiped, no update needed." });
      }
      throw swipeError;
    }

    // 3. Update User Interests (The Brain)
    const { data: event } = await supabase.from('events').select('category_id').eq('id', eventId).single();
    const { data: profile } = await supabase.from('profiles').select('interests').eq('id', userId).single();

    let interests = profile?.interests || {};
    const catKey = `cat_${event.category_id}`;

    if (direction === 'right') {
      // Reward the category
      interests[catKey] = (interests[catKey] || 0) + 1.0;
    } else {
      // Penalize slightly, but don't go below zero
      interests[catKey] = Math.max(0, (interests[catKey] || 0) - 0.2);
    }

    // 4. Save the updated interest object
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ interests })
      .eq('id', userId);

    if (profileError) throw profileError;

    res.status(200).json({ 
      status: "success", 
      message: `Learned: ${direction} on category ${event.category_id}` 
    });

  } catch (error) {
    console.error("Swipe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * getRecommendations
 * Logic: Filters out swiped events and ranks the rest by user interests.
 * Path: GET /api/swipe/recommendations/:userId
 */
export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Parallel fetch for performance
    const [profileRes, swipesRes, eventsRes] = await Promise.all([
      supabase.from('profiles').select('interests').eq('id', userId).single(),
      supabase.from('swipes').select('event_id').eq('user_id', userId),
      supabase.from('events').select('*')
    ]);

    if (eventsRes.error) throw eventsRes.error;

    const interests = profileRes.data?.interests || {};
    // Convert swiped event IDs into a Set for O(1) lookup speed
    const swipedIds = new Set(swipesRes.data?.map(s => s.event_id) || []);

    // 2. Filter: Only show events the user hasn't interacted with yet, AND isn't the host of
    const availableEvents = eventsRes.data.filter(event => 
      !swipedIds.has(event.id) && event.host_id !== userId
    );

    // 3. Sort by interest weight + Random Discovery Factor
    const rankedEvents = availableEvents.sort((a, b) => {
      const weightA = interests[`cat_${a.category_id}`] || 0;
      const weightB = interests[`cat_${b.category_id}`] || 0;

      // Add a random offset (0.0 to 0.4) so the order isn't strictly repetitive
      const scoreA = weightA + Math.random() * 0.4;
      const scoreB = weightB + Math.random() * 0.4;

      return scoreB - scoreA; // Descending (highest score first)
    });

    // 4. Return the top 10 recommended events
    res.status(200).json(rankedEvents.slice(0, 10));

  } catch (error) {
    console.error("Recommendation Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};