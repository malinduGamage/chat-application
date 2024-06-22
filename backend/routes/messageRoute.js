import express from 'express';
const router = express.Router();

import { protectedRoute } from '../middleware/protectedRoute.js';
import { sendMessage, createConversation, addMembers, getConversations, deleteConversation, leaveConversation, getMessages, getMembers, deleteMessage, removeMember } from '../controllers/messageController.js';


//message routes
router.post("/send/:convoId", protectedRoute, sendMessage); //send message to conversation
router.delete("/deleteMessage/:messageId", protectedRoute, deleteMessage); //delete message
router.get("/getMessages/:convoId", protectedRoute, getMessages); //get messages
//conversation routes
router.post("/newConvo", protectedRoute, createConversation); //create new conversation
router.get("/getConvo", protectedRoute, getConversations); //get all conversations
router.delete("/deleteConvo/:convoId", protectedRoute, deleteConversation); //delete conversation
router.post("/leaveConvo/:convoId", protectedRoute, leaveConversation); //leave conversation
//members routes
router.post("/addMembers/:convoId", protectedRoute, addMembers); //add members to conversation
router.get("/getMembers/:convoId", protectedRoute, getMembers); //get members of conversation
router.delete("/removeMember/:convoId/:userId", protectedRoute, removeMember); //remove member from conversation



export default router;