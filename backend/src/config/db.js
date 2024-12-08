require("dotenv").config();
const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, REDIS_HOST, WS_PORT } =
  process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

pool
  .getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err.message));

module.exports = pool;
