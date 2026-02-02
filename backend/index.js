import express from 'express';
import cors from 'cors';
import { supabase } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
// cors: Allows the Frontend (React Native) to talk to this Backend.
app.use(cors());
// express.json: Essential for reading data sent in the "body" of a request.
app.use(express.json());

// HEALTH CHECK
// A simple route to verify the server is running locally.
app.get('/', (req, res) => {
  res.send('Event Marketplace API is Online - V1.0');
});

// DATABASE HANDSHAKE
// This route is for development testing only. 
// It verifies that the connection to Supabase is active and the RLS policies are set.
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('Profile').select('*').limit(1);
    
    if (error) throw error;
    
    res.json({ 
      status: "success", 
      message: "Backend is successfully communicating with Supabase.",
      data 
    });
  } catch (err) {
    res.status(500).json({ 
      status: "error", 
      message: err.message 
    });
  }
});

// SERVER START
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Test the connection at: http://localhost:${port}/test-db`);
});