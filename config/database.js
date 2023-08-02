const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "12345",
  DB_HOST = "127.0.0.1",
  DB_NAME = "db_bk",
  DB_URL = "postgresql://postgres:qldh2XZQ5lJimphU7jyh@containers-us-west-101.railway.app:8030/railway",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    url: DB_URL,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    url: DB_URL,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    url: DB_URL,
    dialect: "postgres",
  },
};
