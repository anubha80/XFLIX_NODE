const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../../.env') });


module.exports = {
  port: process.env.BE_PORT,
  db_url: process.env.MONGODB_URL,
};