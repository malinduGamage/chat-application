import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';
import { User } from "./userModel.js";

const PrivateChat = sequelize.define('PrivateChat', {
    members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        validate: {
            isSpecificLength(value) {
                if (value.length !== 2) {
                    throw new Error('Private chat must only have two members')
                }
            }
        }
    }
}, {
    tableName: 'privatechat',
    schema: 'public',
    timestamps: false

});

const syncPrivateChat = async () => {
    try {
        await PrivateChat.sync();
        console.log('PrivateChat Model synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}

export { PrivateChat, syncPrivateChat };