const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "qldh2XZQ5lJimphU7jyh",
  DB_HOST = "containers-us-west-101.railway.app",
  DB_NAME = "railway",
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
