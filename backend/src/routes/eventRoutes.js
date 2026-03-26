import express from 'express';
import { createEvent, getMyEvents, getEventById, getAllEvents} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createEvent);
router.get('/', getAllEvents);
router.get('/managed/me', authenticateToken, getMyEvents);
router.get('/:id', getEventById);

export default router;

