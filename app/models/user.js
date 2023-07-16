"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama harus diisi",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email harus diisi",
          },
          isEmail: {
            msg: "Email tidak sesuai",
          },
          isLowercase: {
            msg: "Email tidak menggunakan huruf kecil",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password harus diisi",
          },
          len: {
            args: [8, 100],
            msg: "Kata sandi minimal harus terdiri dari 8 karakter",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Peran harus diisi",
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nomor telepon harus diisi",
          },
          isNumeric: {
            msg: "Nomor telepon tidak sesuai",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Alamat harus diisi",
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
      modelName: "User",
    }
  );
  return User;
};
