import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';
import { User } from "./userModel.js";
import { Conversation } from "./conversationModel.js";

const ConvoUser = sequelize.define('ConvoUser', {
    conversationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Conversation,
            key: 'id',
        },
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        primaryKey: true
    }
}, {
    tableName: 'convouser',
    schema: 'public',
    timestamps: false

});

const syncConvoUser = async () => {
    try {
        await ConvoUser.sync();
        console.log('convoUser were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}

export { ConvoUser, syncConvoUser };