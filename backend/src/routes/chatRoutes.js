import express from 'express';
// Added sendMessage to the import below:
import { getMessages, createConversation, sendMessage } from '../controllers/chatController.js'; 

const router = express.Router();

// POST /api/chat/create -> starts a new chat room
router.post('/create', createConversation); 

// POST /api/chat/send -> drops a message into a chat room
router.post('/send', sendMessage);

// GET /api/chat/:conversationId -> fetches the messages
router.get('/:conversationId', getMessages);

export default router;