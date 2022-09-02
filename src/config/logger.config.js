const path = require("path");
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, prettyPrint } = format;
const vars = require("./vars.config");

const devLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        level: "debug",
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [new transports.Console()],
    });
}

const prodLogger = () => {
    return createLogger({
        level: "info",
        format: combine(timestamp(), errors({ stack: true }), prettyPrint()),
        // defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console(),
            new transports.File({ filename: path.join(__dirname,'..','logs','error.log'), level: 'error' }),
            new transports.File({ filename: path.join(__dirname,'..','logs','combined.log') }),
        ],
    });
}


let logger = null;
if (vars.env === 'development') {
    logger = devLogger();
} else {
    logger = prodLogger();
}

module.exports = logger;

