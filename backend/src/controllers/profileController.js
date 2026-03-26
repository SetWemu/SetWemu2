import { supabase } from '../config/db.js';

export const getProfile = async (req, res) => {
  const { id } = req.params;
  console.log(`[API] Fetching profile for: ${id}`);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // Self-healing: If profile doesn't exist, try to create it
    if (error.code === 'PGRST116') {
      console.log(`[Self-Heal] Profile missing for ${id}. Initializing...`);
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([{ id, username: `user_${id.substring(0, 5)}` }])
        .select()
        .single();

      if (createError) {
        console.error(`[Self-Heal] Failed for ${id}:`, createError.message);
        return res.status(404).json({ error: "Profile not found and could not be created." });
      }
      return res.json(newProfile);
    }

    console.error(`[API] Profile fetch error for ${id}:`, error.message);
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(data);
};

export const updateProfile = async (req, res) => {
  const { username, bio } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ username, bio })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};