import { supabase } from '../config/db.js';

export const getProfile = async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: "Profile not found" });
  res.json(data);
};

export const updateProfile = async (req, res) => {
  const {username, bio} = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
    }

  const { data, error } = await supabase
    .from('profiles')
    .update({ username, bio})
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};