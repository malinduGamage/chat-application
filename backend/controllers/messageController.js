import { User } from '../models/userModel.js';
import { Conversation } from '../models/conversationModel.js';
import { ConvoUser } from '../models/convouserModel.js';
import { Message } from '../models/messageModel.js';

export const createConversation = async (req, res) => {
    try {
        const { name, members } = req.body;
        const user = req.user;

        //check if conversation name is provided
        if (!name) return res.status(400).json({ message: "Conversation name is required" });

        //check if members are provided
        if ((!members) || (members.length < 1)) return res.status(400).json({ message: "At least one member is required" });

        //check if members are available in database
        members.forEach(async (member) => {
            const user = await User.findByPk(member.id);
            if (!user) return res.status(400).json({ message: "Invalid member" });
        });

        //create conversation
        const convo = new Conversation({ name: name, userID: user.id });
        await convo.save();

        //add creator to conversation
        const creator = new ConvoUser({ conversationID: convo.id, userID: user.id });
        await creator.save();

        //add members to conversation
        members.forEach(async (member) => {
            const newMember = new ConvoUser({ conversationID: convo.id, userID: member.id });
            await newMember.save();
        });

        res.status(201).json({ message: "Conversation created successfully" });

    } catch (error) {
        console.log("Error in createConversation controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getConversations = async (req, res) => {
    try {
        const user = req.user;

        //get all conversation id s of user
        const convoRecords = await ConvoUser.findAll({ where: { userID: user.id } });

        //get all conversations of user
        const convos = [];
        for (let i = 0; i < convoRecords.length; i++) {
            const convo = await Conversation.findByPk(convoRecords[i].conversationID);
            convos.push(convo);
        }

        res.status(200).json(convos);

    } catch (error) {
        console.log("Error in getConversations controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const leaveConversation = async (req, res) => {
    try {
        const { convoId } = req.params;
        const user = req.user;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is the admin of conversation
        const admin = await Conversation.findOne({ where: { id: convoId, userID: user.id } });
        if (admin) return res.status(400).json({ message: "Admin cannot leave conversation" });

        //leave conversation
        await ConvoUser.destroy({ where: { conversationID: convoId, userID: user.id } });

        res.status(200).json({ message: "Left conversation successfully" });

    } catch (error) {
        console.log("Error in leaveConversation controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteConversation = async (req, res) => {
    try {
        const { convoId } = req.params;
        const user = req.user;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is the admin of conversation
        const admin = await Conversation.findOne({ where: { id: convoId, userID: user.id } });
        if (!admin) return res.status(400).json({ message: "Only admin can delete conversation" });

        //delete all messages of conversation
        await Message.destroy({ where: { conversationID: convoId } });

        //remove all members from conversation
        await ConvoUser.destroy({ where: { conversationID: convoId } });

        //delete conversation
        await convo.destroy();

        res.status(200).json({ message: "Conversation deleted successfully" });

    } catch (error) {
        console.log("Error in deleteConversation controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addMembers = async (req, res) => {
    try {
        const { convoId } = req.params;
        const { members } = req.body;
        const user = req.user;

        //check if members are provided
        if ((!members) || (members.length < 1)) return res.status(400).json({ message: "At least one member is required" });

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is the admin of conversation
        const admin = await Conversation.findOne({ where: { id: convoId, userID: user.id } });
        if (!admin) return res.status(400).json({ message: "Only admin can add members" });

        //check members are available in database
        members.forEach(async (member) => {
            const user = await User.findByPk(member.id);
            if (!user) return res.status(400).json({ message: "Invalid member" });
        });


        //check if members are already part of conversation
        members.forEach(async (member) => {
            const memberRecord = await ConvoUser.findOne({ where: { conversationID: convoId, userID: member.id } });
            if (memberRecord) return res.status(400).json({ message: "Member already part of conversation" });
        });

        //add members to conversation
        members.forEach(async (member) => {
            const newMember = new ConvoUser({ conversationID: convoId, userID: member.id });
            await newMember.save();
        });

        res.status(200).json({ message: "Members added successfully" });

    } catch (error) {
        console.log("Error in addMembers controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMembers = async (req, res) => {
    try {
        const { convoId } = req.params;
        const user = req.user;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is part of conversation
        const membership = await ConvoUser.findOne({ where: { conversationID: convoId, userID: user.id } });
        if (!membership) return res.status(400).json({ message: "Unauthorized conversation" });

        //get all members of conversation
        const members = await ConvoUser.findAll({ where: { conversationID: convoId } });

        res.status(200).json(members);

    } catch (error) {
        console.log("Error in getMembers controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeMember = async (req, res) => {
    try {
        const { convoId, userId } = req.params;
        const user = req.user;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is the admin of conversation
        const admin = await Conversation.findOne({ where: { id: convoId, userID: user.id } });
        if (!admin) return res.status(400).json({ message: "Only admin can remove members" });

        //check if member exists in conversation
        const member = await ConvoUser.findOne({ where: { conversationID: convoId, userID: userId } });
        if (!member) return res.status(400).json({ message: "Invalid member" });

        //remove member from conversation
        await member.destroy();

        res.status(200).json({ message: "Member removed successfully" });

    } catch (error) {
        console.log("Error in removeMember controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const sendMessage = async (req, res) => {
    try {
        //get message and conversation id
        const { message } = req.body;
        const { convoId } = req.params;
        const senderId = req.user.id;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is part of conversation
        const user = await ConvoUser.findOne({ where: { conversationID: convoId, userID: senderId } });
        if (!user) return res.status(400).json({ message: "Unauthorized conversation" });

        //save message
        const newMessage = new Message({ userID: senderId, conversationID: convoId, message: message });
        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { convoId } = req.params;
        const user = req.user;

        //check if conversation exists
        const convo = await Conversation.findByPk(convoId);
        if (!convo) return res.status(400).json({ message: "Invalid conversation" });

        //check if user is part of conversation
        const membership = await ConvoUser.findOne({ where: { conversationID: convoId, userID: user.id } });
        if (!membership) return res.status(400).json({ message: "Unauthorized conversation" });

        //get all messages of conversation
        const messages = await Message.findAll({ where: { conversationID: convoId } });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const user = req.user;

        //check if message exists
        const message = await Message.findByPk(messageId);
        if (!message) return res.status(400).json({ message: "Invalid message" });

        //check if user is the sender of message
        if (message.userID !== user.id) return res.status(400).json({ message: "Unauthorized message" });

        //delete message
        await message.destroy();

        res.status(200).json({ message: "Message deleted successfully" });

    } catch (error) {
        console.log("Error in deleteMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}