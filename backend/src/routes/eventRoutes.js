import express from 'express';
import { createEvent, getAllEvents, getEventById } from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

export default router;

