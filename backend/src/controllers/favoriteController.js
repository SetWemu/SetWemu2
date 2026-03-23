import { supabase } from '../config/db.js';

export const toggleFavorite = async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user_id)
      .eq('event_id', event_id)
      .maybeSingle();

    if (existing) {
      await supabase.from('favorites').delete().eq('id', existing.id);
      return res.json({ message: "Removed from favorites", favorited: false });
    }

    const { error } = await supabase.from('favorites').insert({ user_id, event_id });
    if (error) throw error;

    res.status(201).json({ message: "Added to favorites", favorited: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('event_id, events(*)')
      .eq('user_id', userId);

    if (error) throw error;
    res.json(data.map(f => f.events)); // Returns flat array of event objects
  } catch (error) {
    res.status(400).json({ error: errowr.message });
  }
};