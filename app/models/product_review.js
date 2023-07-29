"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Review.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
    }
  }
  Product_Review.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "ID pembelian harus diisi",
          },
          isNumeric: {
            msg: "ID pembelian tidak sesuai",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Penilaian harus diisi",
          },
          isNumeric: {
            msg: "Penilaian tidak sesuai",
          },
        },
      },
      review: {
        type: DataTypes.TEXT,
      },
      picture: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Foto harus diisi",
          },
          isUrl: {
            msg: "Foto tidak sesuai",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product_Review",
    }
  );
  return Product_Review;
};
