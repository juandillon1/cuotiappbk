const dotenv = require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    AUTH0_SECRET: process.env.AUTH0_SECRET || 'supersecretseedcuot3d3"Q@a',

}