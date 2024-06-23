import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//import cors from 'cors';

import { syncDb, testDbConnection } from './db/connection.js';
import { syncPrivateChat } from './models/privateChatModel.js';
import { syncConvoUser } from './models/convouserModel.js';
import { syncMessage } from './models/messageModel.js';
import { syncGroup } from './models/groupModel.js';

import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js'

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//app.use(cors());
app.use(express.json());
app.use(cookieParser());

//app.get('/', (req, res) => {
//    res.send('Hello World!');
//});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute)

app.listen(PORT, () => {
    //testDbConnection();
    //syncDb();;
    //syncPrivateChat();
    //syncGroup();
    //syncConvoUser();
    //syncMessage();
    console.log(`Server is running on port ${PORT}`);
});
