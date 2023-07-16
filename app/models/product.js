"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      code: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Kode harus diisi",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Tipe harus diisi",
          },
        },
      },
      size: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Ukuran harus diisi",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama harus diisi",
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "warna harus diisi",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Harga harus diisi",
          },
          isNumeric: {
            msg: "Harga tidak sesuai",
          },
        },
      },
      pieces: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Potongan harus diisi",
          },
          isNumeric: {
            msg: "Potongan tidak sesuai",
          },
        },
      },
      surface: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Permukaan harus diisi",
          },
        },
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
      modelName: "Product",
    }
  );
  return Product;
};
