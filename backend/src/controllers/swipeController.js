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
 * Logic: Filters out swiped events and ranks the rest using a Multi-Factor Score.
 * Path: GET /api/swipe/recommendations/:userId
 */
export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`[Swipe] Generating recommendations for ${userId}...`);

    // 1. Parallel fetch: User's brain (interests) and interaction history
    const [profileRes, swipesRes] = await Promise.all([
      supabase.from('profiles').select('interests').eq('id', userId).single(),
      supabase.from('swipes').select('event_id').eq('user_id', userId)
    ]);

    const interests = profileRes.data?.interests || {};
    const swipedIds = new Set(swipesRes.data?.map(s => s.event_id) || []);

    // 2. Optimized Database Fetch: Only look at future events, excluding the user's own
    // Limitation: Supabase doesn't allow 'NOT IN' with 1000s of IDs easily, 
    // so we fetch a relevant batch and filter.
    const { data: rawEvents, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .neq('host_id', userId)
      .gte('date', new Date().toISOString().split('T')[0]) // Only future/current events
      .order('created_at', { ascending: false })
      .limit(200); // Only look at the latest 200 candidates

    if (eventsError) throw eventsError;

    // 3. The Algorithm (Ranking Engine)
    const now = new Date();
    const rankedEvents = rawEvents
      .filter(e => !swipedIds.has(e.id)) // Remove events already swiped
      .map(event => {
        // --- SCORE 1: Category Interest (Base) ---
        const categoryWeight = interests[`cat_${event.category_id}`] || 0;
        
        // --- SCORE 2: Freshness Boost ---
        const createdDate = new Date(event.created_at || now);
        const ageInHours = (now - createdDate) / (1000 * 60 * 60);
        const freshnessBoost = Math.max(0, 1.0 - (ageInHours / 48)); // Boost events created in last 48h

        // --- SCORE 3: Discovery Randomness ---
        // (Ensures the list feels "alive" and not robotically identical)
        const discoveryFactor = Math.random() * 0.5;

        // FINAL CALCULATION
        const finalScore = (categoryWeight * 1.5) + (freshnessBoost * 0.8) + discoveryFactor;

        return { ...event, _score: finalScore };
      })
      .sort((a, b) => b._score - a._score); // Highest score first

    // 4. Return the top refined batch
    res.status(200).json(rankedEvents.slice(0, 15));

  } catch (error) {
    console.error("Critical Recommendation Error:", error.message);
    res.status(500).json({ error: "Internal Algorithm Error" });
  }
};