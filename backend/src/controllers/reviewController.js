import { supabase } from '../config/db.js';

export const createReview = async (req, res) => {
  const { user_id, event_id, rating, comment } = req.body;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert({ user_id, event_id, rating, comment })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') throw new Error("You have already reviewed this event.");
      throw error;
    }

    res.status(201).json({ message: "Review submitted", review: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEventReviews = async (req, res) => {
  const { eventId } = req.params;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        profiles (full_name, avatar_url)
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};