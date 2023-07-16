const { where } = require("sequelize");
const { Cart, User, Product } = require("../models");

module.exports = {
  find(id) {
    return Cart.findOne({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "phone_number",
            "role",
            "address",
          ],
        },
        {
          model: Product,
          attributes: [
            "id",
            "code",
            "type",
            "size",
            "name",
            "color",
            "price",
            "pieces",
            "surface",
            "picture",
          ],
        },
      ],
      where: {
        id,
      },
      attributes: ["id", "quantity"],
    });
  },

  findByUser(user) {
    return Cart.findAll({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "phone_number",
            "role",
            "address",
          ],
        },
        {
          model: Product,
          attributes: [
            "id",
            "code",
            "type",
            "size",
            "name",
            "color",
            "price",
            "pieces",
            "surface",
            "picture",
          ],
        },
      ],
      where: {
        user_id: user,
      },
      attributes: ["id", "quantity"],
    });
  },
  getAll() {
    return Cart.findAll({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "phone_number",
            "role",
            "address",
          ],
        },
        {
          model: Product,
          attributes: [
            "id",
            "code",
            "type",
            "size",
            "name",
            "color",
            "price",
            "pieces",
            "surface",
            "picture",
          ],
        },
      ],
      attributes: ["id", "quantity"],
    });
  },
  create(data) {
    return Cart.create({
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity,
    });
  },
  update(id, data) {
    return Cart.update(
      {
        quantity: data.quantity,
      },
      { where: { id } }
    );
  },
  delete(id) {
    return Cart.destroy({
      where: {
        id,
      },
    });
  },
};
