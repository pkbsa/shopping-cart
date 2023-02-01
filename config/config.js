
var dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongodb_url: process.env.MONGO_URL,
  line_api: process.env.LINE_API,
  port: process.env.PORT
};