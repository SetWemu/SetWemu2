import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);          // Buy tickets
router.get('/user/:userId', getUserBookings); // View "My Tickets"

export default router;