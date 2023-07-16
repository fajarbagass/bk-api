"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Cart.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Cart.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "ID pengguna harus diisi",
          },
          isNumeric: {
            msg: "ID pengguna tidak sesuai",
          },
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "ID produk harus diisi",
          },
          isNumeric: {
            msg: "ID produk tidak sesuai",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Kuantitas harus diisi",
          },
          isNumeric: {
            msg: "Kuantitas tidak sesuai",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
