/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "12345",
  DB_HOST = "postgresql://postgres:nyD3mWOTo0BufWdm6L0V@containers-us-west-135.railway.app:5504/railway",
  DB_NAME = "db_bk",
} = process.env;

module.exports = {
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
