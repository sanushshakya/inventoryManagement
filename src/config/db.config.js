const vars = require("./vars.config")
const logger = require("../config/logger.config")

module.exports = {
  development: {
    username: vars.db.username,
    password: vars.db.passowrd,
    database: vars.db.database,
    host: vars.db.host,
    dialect: vars.db.dialect,
    // query: {
    //   raw: true
    // },
    logging: (message) => logger.info(message),
  },
  production: {
    username: vars.db.username,
    password: vars.db.passowrd,
    database: vars.db.database,
    host: vars.db.host,
    dialect: vars.db.dialect,
    query: {
      raw: true
    }
  }
}

