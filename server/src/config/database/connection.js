const dotenv = require("dotenv");
const database = require("pg");

dotenv.config();

const connection = new database.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});

module.exports = { connection };
