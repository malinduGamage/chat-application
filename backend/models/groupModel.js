import { sequelize } from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'group',
    schema: 'public',
    timestamps: false

});

const syncGroup = async () => {
    try {
        await Group.sync();
        console.log('Group model synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}

export { Group, syncGroup };