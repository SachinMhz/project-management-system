require('./env');
const Pool = require("pg").Pool;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const pool = new Pool(dbConfig);

module.exports = pool;
