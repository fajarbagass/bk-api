/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "default",
  DB_PASSWORD = "cxwJP0afUY8j",
  DB_HOST = "ep-fancy-recipe-71699450-pooler.us-east-1.postgres.vercel-storage.com",
  DB_NAME = "verceldb",
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
