import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('connectionString:', process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Set to true if you want to verify the SSL certificate
        }
    }
});

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