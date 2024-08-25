import express from 'express';
const router = express.Router();

import { protectedRoute } from '../middleware/protectedRoute.js';
import { sendMessage, createPrivateChat, addMembers, getMessages, getMembers, deleteMessage, getPrivateChats, createGroup, getGroup, getPeople } from '../controllers/messageController.js';


//message routes
router.post("/send/:type/:convoId", protectedRoute, sendMessage); //send message to conversation
router.delete("/deleteMessage/:messageId", protectedRoute, deleteMessage); //delete message
router.get("/getMessages/:type/:convoId", protectedRoute, getMessages); //get messages
router.get("/getPeople", protectedRoute, getPeople); //get People
//private chat routes
router.post("/private/createChat", protectedRoute, createPrivateChat); //create private chat
router.get("/private/getChat", protectedRoute, getPrivateChats); //get all conversations
//group chat routes
router.post("/group/createChat", protectedRoute, createGroup); //create group chat
router.get("/group/getChat", protectedRoute, getGroup); //get all conversations
router.post("/group/addMembers/:convoId", protectedRoute, addMembers); //add members to conversation
router.get("/group/getMembers/:convoId", protectedRoute, getMembers); //get members of conversation

export default router;