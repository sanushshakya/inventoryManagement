const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") })

//TODO: validate process.env here

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    base: process.env.BASE_URL,
    db: {
        username: process.env.DB_USER,
        passowrd: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
}