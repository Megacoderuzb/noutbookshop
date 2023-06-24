const env = require("dotenv");
env.config();

module.exports = {
  db_port: process.env.PORT || 5432,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  jwtSecret: process.env.jwtSecret,
};
