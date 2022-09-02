const { sequelize } = require("../models/index")
const logger = require("../config/logger.config")

const dbConnection = async (seq) => {
    try {
        await sequelize.authenticate();
        logger.info('Connected to database');
    } catch (error) {
        throw logger.error(new Error("Unable to connect to database"))
    }
}

module.exports = dbConnection