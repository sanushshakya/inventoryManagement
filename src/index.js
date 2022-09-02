const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")
const path = require("path")
const bodyParser = require("body-parser")
const multer = require("multer");
const upload = multer()
// utils and config imports
const db = require("./utils/db.utils")
const indexRoutes = require("./routes")
const logger = require("./config/logger.config")
const morgan = require("./config/morgan.config");
const swaggerDocument = require('./config/jsdoc.config');
// env config
dotenv.config();

const PORT = process.env.PORT || 8080;

const init = async () => {
    try {
        await db()
        const app = express()

        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        // app.use(upload.any())
        app.use(morgan.reqHandler)
        // console.log( path.join(__dirname,'media','uploads'))
        app.use('/media', express.static(path.join(__dirname, 'media', 'uploads')))
        // Define routes
        app.use('/api', indexRoutes)
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        // not found
        app.get("/", (_, res) => res.status(200).json({ message: "Backend Active!" }))
        // catch 404 
        app.use((_, res) => res.status(404).json({ message: "Route not found!" }));
        app.listen(PORT || 8080, () => {
            logger.info(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        logger.error("Something went wrong: ", error)
    }
}

init()

const unexpectedErrorHandler = (error) => {
    logger.error(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
});


