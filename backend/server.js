import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
import path from 'path';

import { syncDb, testDbConnection } from './db/connection.js';
import { syncPrivateChat } from './models/privateChatModel.js';
import { syncConvoUser } from './models/convouserModel.js';
import { syncMessage } from './models/messageModel.js';
import { syncGroup } from './models/groupModel.js';

import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js'

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

//app.use(cors());
app.use(express.json());
app.use(cookieParser());

//app.get('/', (req, res) => {
//    res.send('Hello World!');
//});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute)

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

server.listen(PORT, () => {
    // testDbConnection();
    // syncDb();;
    // syncPrivateChat();
    // syncGroup();
    // syncConvoUser();
    // syncMessage();
    console.log(`Server is running on port ${PORT}`);
});
