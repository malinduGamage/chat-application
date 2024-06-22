import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('chatApp', 'postgres', 'ms119119', {
    host: 'localhost',
    dialect: 'postgres'
})

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

const syncDb = async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync:', error);
    }
}

export { sequelize, testDbConnection, syncDb };