import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';
import { User } from "./userModel.js";

const Conversation = sequelize.define('Message', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    tableName: 'conversation',
    schema: 'public',
    timestamps: false

});

const syncConvo = async () => {
    try {
        await Conversation.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}

export { Conversation, syncConvo };