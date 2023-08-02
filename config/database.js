const {
  DB_USERNAME = "",
  DB_PASSWORD = "",
  DB_HOST = "",
  DB_NAME = "",
  DB_PORT = "5432",
  DB_URL = "postgresql://postgres:qldh2XZQ5lJimphU7jyh@containers-us-west-101.railway.app:8030/railway",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
  production: {
    dialect: "postgres",
    use_env_variable: "DB_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
