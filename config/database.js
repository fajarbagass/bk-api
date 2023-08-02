const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "12345",
  DB_HOST = "127.0.0.1",
  DB_NAME = "db_bk",
  DB_URL,
} = process.env;

const db = new Sequelize(DB_URL, {
  define: {
    timestamps: false,
  },
});

module.exports = {
  db,
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
