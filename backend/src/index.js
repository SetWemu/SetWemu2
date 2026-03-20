import express from 'express';
import cors from 'cors';
import { supabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; 
import eventRoutes from './routes/eventRoutes.js';
import postRoutes from './routes/postRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import followRoutes from './routes/followRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE (Must come BEFORE routes)
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/bookings', bookingRoutes)
app.use('/api/favorites', favoriteRoutes);
app.use('/api/follows', followRoutes);

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('Event Marketplace API is Online - V1.0');
});

// DATABASE HANDSHAKE (Uses 'profiles' - Correct!)
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) throw error;
    res.json({ 
      status: "success", 
      message: "Backend is successfully communicating with Supabase.",
      data 
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Test the connection at: http://localhost:${port}/test-db`);
});