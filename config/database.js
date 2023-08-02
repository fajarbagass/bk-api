const { Sequelize } = require("../app/models");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URL } = process.env;

const db = new Sequelize(DB_URL, {
  define: {
    timestamps: false,
  },
});

module.exports = db;
// module.exports = {
//   development: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_development`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
//   test: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_test`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
//   production: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_production`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
// };
