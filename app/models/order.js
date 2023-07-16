"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Order.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Order.init(
    {
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Kode harus diisi",
          },
        },
      },
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
      total_amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Total Harga harus diisi",
          },
          isNumeric: {
            msg: "Total Harga tidak sesuai",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Status harus diisi",
          },
        },
      },
      payment_proof: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Bukti Pembayaran harus diisi",
          },
          isUrl: {
            msg: "Bukti Pembayaran tidak sesuai",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
