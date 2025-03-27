import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import protect  from '../middleware/authMiddleware';

const messageRouter = express.Router();
messageRouter.post('/', protect, sendMessage);
messageRouter.get('/', protect, getMessages);

export default messageRouter;