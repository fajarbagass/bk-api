/** Destruct environment variable to get database configuration */
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSGRES_URL + "?sslmode=require",
});

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "12345",
  DB_HOST = "127.0.0.1",
  DB_NAME = "db_bk",
} = process.env;

module.exports = {
  pool,
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    dialect: "postgres",
  },
};
