const swaggerJsdoc = require('swagger-jsdoc');
const swaggerconfig = require('./swagger.config')

const options = {
  definition: {
    ...swaggerconfig
  },
  apis: ['./src/routes/*.route.js'], // files containing annotations
};

module.exports = swaggerJsdoc(options);