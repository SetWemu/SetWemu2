import express from 'express';
import cors from 'cors';
import { supabase } from './config/db.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; 
import eventRoutes from './routes/eventRoutes.js';
import postRoutes from './routes/postRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import followRoutes from './routes/followRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import swipeRoutes from './routes/swipeRoutes.js'; // Ensure this matches your file/folder name

const app = express();
const port = process.env.PORT || 3000;

// --- MIDDLEWARE ---
// Must be defined before routes so they can process incoming data
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/swipe', swipeRoutes); // Mounts to /api/swipe/interact and /api/swipe/recommendations

// --- UTILITY ROUTES ---
// Health Check: Verify if the server is live
app.get('/', (req, res) => {
  res.send('Event Marketplace API is Online - V1.0');
});

// Database Handshake: Verify Supabase connectivity
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
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

// --- SERVER START ---
// Using '0.0.0.0' allows connections from your Android Emulator/Physical device
app.listen(port, '0.0.0.0', () => {
  console.log(`\n🚀 SetWemu Backend Running`);
  console.log(`Local:           http://localhost:${port}`);
  console.log(`Network/Mobile:  http://YOUR_PC_IP:${port}`); 
});