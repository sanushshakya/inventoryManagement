const morgan = require("morgan")
const vars = require("./vars.config")
const logger = require("./logger.config")

morgan.token("message", (req, res) => res.message || "");

const getIpFormat = () => vars.env === "production" ? ":remote-addr - " : "";
const responseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;

const reqHandler = morgan('dev', {
    stream: { write: (message) => logger.info(message.trim()) },
});

module.exports = {
    reqHandler
};
