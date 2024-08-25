import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    profilepic: {
        type: DataTypes.STRING(255),
    }
}, {
    tableName: 'user',
    schema: 'public',
    timestamps: false

});

export { User };