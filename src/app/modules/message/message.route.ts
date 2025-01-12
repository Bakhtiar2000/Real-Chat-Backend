import express from 'express';
import auth from '../../middleWear/auth';
import { messageControllers } from './message.controller';

const router = express.Router();

router.get("/users", auth, messageControllers.getSidebarUsers);
router.get("/:chatUserId", auth, messageControllers.getAllMessages);
router.post("/send/:receiverId", auth, messageControllers.sendMessage);

export const MessageRoutes = router;
