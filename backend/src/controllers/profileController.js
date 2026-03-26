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
  const { id } = req.params;
  const {
    username,
    full_name,
    bio,
    phone,
    location,
    avatar_url
  } = req.body;

  try {
    // 1. Basic Validation
    if (username && username.length < 3) {
      return res.status(400).json({ error: "Username must be at least 3 characters" });
    }

    // 2. Perform the Update
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username,
        full_name,
        bio,
        phone,
        location,
        avatar_url,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      message: "Profile updated successfully",
      profile: data
    });
  } catch (error) {
    console.error(`[API] Profile update error for ${id}:`, error.message);
    res.status(500).json({ error: error.message });
  }
};