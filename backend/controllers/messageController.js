import { User } from '../models/userModel.js';
import { PrivateChat } from '../models/privateChatModel.js';
import { ConvoUser } from '../models/convouserModel.js';
import { Message } from '../models/messageModel.js';
import { Group } from '../models/groupModel.js';
import { Op } from 'sequelize';
import { getRecieverSocketId } from '../socket/socket.js';
import { io } from '../socket/socket.js';

//PrivateChat controllers
export const createPrivateChat = async (req, res) => {
    try {
        const { otherUserId } = req.body;
        const user = req.user;
        console.log("othr", otherUserId, "self", user.id)

        //check if other party is provided
        if (!otherUserId) return res.status(400).json({ error: "Other party is required" });

        //check if other party exists
        const otherUser = await User.findByPk(otherUserId);

        if (!otherUser) return res.status(400).json({ error: "Invalid User" });
        console.log("user exists")
        //check if PrivateChat already exists
        const privateChat = await PrivateChat.findOne({
            where: {
                members: {
                    [Op.and]: [
                        { [Op.contains]: [user.id] },
                        { [Op.contains]: [otherUserId] }
                    ]
                }
            }
        });

        if (privateChat) return res.status(200).json({
            id: privateChat.id,
            userId: otherUser.id,
            fullname: otherUser.fullname,
            profilepic: otherUser.profilepic

        });
        console.log("chat doesnt exists")
        //create PrivateChat
        const newPrivateChat = new PrivateChat({ members: [user.id, otherUserId] });
        await newPrivateChat.save();

        res.status(201).json({
            id: newPrivateChat.id,
            userId: otherUser.id,
            fullname: otherUser.fullname,
            profilepic: otherUser.profilepic

        });

    } catch (error) {
        console.log("Error in createPrivateChat controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getPrivateChats = async (req, res) => {
    try {
        const user = req.user;

        //get all PrivateChats of user
        const PrivateChats = await PrivateChat.findAll({ where: { members: { [Op.contains]: [user.id] } } });

        //get user details of PrivateChats
        const users = [];
        for (const privateChat of PrivateChats) {
            const result = privateChat.members.filter((id) => id !== user.id);
            const otherUser = await User.findByPk(result[0]);
            if (otherUser) {
                users.push({
                    id: privateChat.id,
                    userId: otherUser.id,
                    fullname: otherUser.fullname,
                    profilepic: otherUser.profilepic

                });
            }
        }
        //console.log(users);

        res.status(200).json(users);

    } catch (error) {
        console.log("Error in getPrivateChats controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// group chat controllers
export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        //check if groupChat name and description is provided
        if (!name || !description) return res.status(400).json({ error: "Group name and description is required" });

        res.status(201).json({ message: `${name} Group created successfully` });

    } catch (error) {
        console.log("Error in createGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getGroup = async (req, res) => {
    try {
        const user = req.user;

        //get all GroupChat id s of user
        const groupChatsRecords = await ConvoUser.findAll({ where: { userID: user.id } });

        //get all GroupChats of user
        const groupChats = [];
        groupChatsRecords.forEach(async (record) => {
            const groupChat = await Group.findByPk(record.conversationID);
            groupChats.push(groupChat);
        });

        res.status(200).json(groupChats);

    } catch (error) {
        console.log("Error in getGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

export const addMembers = async (req, res) => {
    try {
        const { members } = req.body;
        const { conversationID } = req.params;

        //check if members are provided
        if ((!members) || (members.length < 1)) return res.status(400).json({ error: "At least one member is required" });

        //check if groupChat exists
        const groupChat = await Group.findByPk(conversationID);
        if (!groupChat) return res.status(400).json({ error: "Invalid Group" });

        //check members are available in database
        members.forEach(async (member) => {
            const user = await User.findByPk(member.id);
            if (!user) return res.status(400).json({ error: "Invalid member" });
        });

        //check if members are already part of groupChat
        members.forEach(async (member) => {
            const memberRecord = await ConvoUser.findOne({ where: { conversationID: conversationID, userID: member.id } });
            if (memberRecord) return res.status(400).json({ error: "Member already part of Group" });
        });

        //add members to groupChat
        members.forEach(async (member) => {
            const newMember = new ConvoUser({ conversationID: conversationID, userID: member.id });
            await newMember.save();
        });

        res.status(200).json({ message: "Members added successfully" });

    } catch (error) {
        console.log("Error in addMembers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMembers = async (req, res) => {
    try {
        const { convoId } = req.params;
        const user = req.user;

        //check if group exists
        const convo = await Group.findByPk(convoId);
        if (!convo) return res.status(400).json({ error: "Invalid Group" });

        //check if user is part of Group
        const membership = await ConvoUser.findOne({ where: { conversationID: convoId, userID: user.id } });
        if (!membership) return res.status(400).json({ error: "Unauthorized group" });

        //get all members of PrivateChat
        const members = await ConvoUser.findAll({ where: { conversationID: convoId } });

        res.status(200).json(members);

    } catch (error) {
        console.log("Error in getMembers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// message controllers
export const sendMessage = async (req, res) => {
    try {
        //get message and conversation id
        const { message, senderId } = req.body;
        const { convoId, type } = req.params;

        let convo;

        if (type === "private") {
            //check if Chat exists
            convo = await PrivateChat.findByPk(convoId);
            if (!convo) return res.status(400).json({ error: "Invalid PrivateChat" });

            //check if user is part of chat
            const privateChat = await PrivateChat.findOne({ where: { members: { [Op.contains]: [senderId] } } });
            if (!privateChat) return res.status(400).json({ error: "Unauthorized Private chat" });

        } else if (type === "group") {
            //check if Chat exists
            convo = await Group.findByPk(convoId);
            if (!convo) return res.status(400).json({ error: "Invalid Group" });

            //check if user is part of group
            const user = await ConvoUser.findOne({ where: { conversationID: convoId, userID: senderId } });
            if (!user) return res.status(400).json({ error: "Unauthorized group" });
        }
        else {
            return res.status(400).json({ error: "Invalid chat type" });
        }
        console.log(type);
        //save message
        const newMessage = new Message({ userID: senderId, conversationType: type, conversationID: convoId, message: message });
        await newMessage.save();

        const recieverId = type === "private" ? convo.members.filter((id) => id !== senderId)[0] : null;

        //socket io emit message to reciever
        if (recieverId) {
            const recieverSocketId = getRecieverSocketId(recieverId);
            if (recieverSocketId) {
                io.to(recieverSocketId).emit("newMessage", newMessage);
            }
        }

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { convoId, type } = req.params;
        const user = req.user;

        if (type === "private") {
            //check if Chat exists
            const convo = await PrivateChat.findByPk(convoId);
            if (!convo) return res.status(400).json({ error: "Invalid PrivateChat" });

            //check if user is part of chat
            const privateChat = await PrivateChat.findOne({ where: { members: { [Op.contains]: [user.id] } } });
            if (!privateChat) return res.status(400).json({ error: "Unauthorized Private chat" });

        } else if (type === "group") {
            //check if Chat exists
            const convo = await Group.findByPk(convoId);
            if (!convo) return res.status(400).json({ error: "Invalid Group" });

            //check if user is part of group
            const user = await ConvoUser.findOne({ where: { conversationID: convoId, userID: senderId } });
            if (!user) return res.status(400).json({ error: "Unauthorized group" });
        }
        else {
            return res.status(400).json({ error: "Invalid chat type" });
        }

        //get all messages of PrivateChat
        const messages = await Message.findAll({ where: { conversationID: convoId } });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const user = req.user;

        //check if message exists
        const message = await Message.findByPk(messageId);
        if (!message) return res.status(400).json({ error: "Invalid message" });

        //check if user is the sender of message
        if (message.userID !== user.id) return res.status(400).json({ error: "Unauthorized message" });

        //delete message
        await message.destroy();

        res.status(200).json({ message: "Message deleted successfully" });

    } catch (error) {
        console.log("Error in deleteMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getPeople = async (req, res) => {
    const userId = req.user.id;
    try {
        let people = await User.findAll({
            attributes: ['id', 'fullname', 'profilepic']
        });
        people = people.filter(user => user.id !== userId);
        res.status(200).json(people);

    } catch (error) {
        console.log("Error in getPeople controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}