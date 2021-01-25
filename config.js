// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  APP_ID: process.env.APP_ID,
  KEY: process.env.KEY,
  SECRET: process.env.SECRET,
  CLUSTER: process.env.CLUSTER,
  PORT: process.env.PORT
};