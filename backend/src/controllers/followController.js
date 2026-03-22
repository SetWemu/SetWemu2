import { supabase } from '../config/db.js';

export const toggleFollow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const { data: existing } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', follower_id)
      .eq('following_id', following_id)
      .maybeSingle();

    if (existing) {
      await supabase.from('follows').delete().eq('id', existing.id);
      return res.json({ message: "Unfollowed", following: false });
    }

    const { error } = await supabase.from('follows').insert({ follower_id, following_id });
    if (error) throw error;

    res.status(201).json({ message: "Followed", following: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFollowStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const { count: followersCount } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId);

    const { count: followingCount } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', userId);

    res.json({ followers: followersCount || 0, following: followingCount || 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};