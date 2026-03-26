import { supabase } from '../config/db.js';

export const authenticateToken = async (req, res, next) => {
  // 1. Get the token from the 'Authorization' header
  // Format: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // 2. Ask Supabase to verify this token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // 3. Attach the user object to the request
    // This makes 'req.user.id' available in your controllers!
    req.user = user;
    
    // 4. Move to the next function (the controller)
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(500).json({ error: 'Internal server error during authentication.' });
  }
};