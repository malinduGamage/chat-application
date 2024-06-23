import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';
import { User } from "./userModel.js";

const Message = sequelize.define('Message', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    conversationType: {
        type: DataTypes.ENUM('private', 'group'),
        allowNull: false
    },
    conversationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        console.log('Message Model synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}


export { Message, syncMessage };