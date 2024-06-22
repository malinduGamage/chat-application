import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';
import { User } from "./userModel.js";
import { Conversation } from "./conversationModel.js";

const Message = sequelize.define('Message', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    conversationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Conversation,
            key: 'id',
        }
    },
    message: {
        type: DataTypes.STRING(1024),
    }
}, {
    tableName: 'message',
    schema: 'public',
    timestamps: true

});

const syncMessage = async () => {
    try {
        await Message.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}


export { Message, syncMessage };