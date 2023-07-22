const { Op } = require("sequelize");
const { Order, User, Product } = require("../models");

module.exports = {
  find(id) {
    return Order.findOne({
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
            "picture",
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
      attributes: [
        "id",
        "code",
        "quantity",
        "shipping_cost",
        "status",
        "payment_proof",
      ],
      order: [["id", "DESC"]],
    });
  },

  findByUser(user) {
    return Order.findAll({
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
            "picture",
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
      attributes: [
        "id",
        "code",
        "quantity",
        "shipping_cost",
        "status",
        "payment_proof",
        "updatedAt",
      ],
      order: [["updatedAt", "DESC"]],
    });
  },

  filterByCode(code) {
    return Order.findAll({
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
            "picture",
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
        code: {
          [Op.like]: `%${code}%`,
        },
      },
      attributes: [
        "id",
        "code",
        "quantity",
        "shipping_cost",
        "status",
        "payment_proof",
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  getAll() {
    return Order.findAll({
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
            "picture",
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
      attributes: [
        "id",
        "code",
        "quantity",
        "shipping_cost",
        "status",
        "payment_proof",
        "updatedAt",
      ],
      order: [["updatedAt", "DESC"]],
    });
  },

  create(data) {
    return Order.create({
      code: data.code,
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity,
      shipping_cost: data.shipping_cost,
      status: data.status,
    });
  },

  update(id, data, photo) {
    return Order.update(
      {
        status: data.status,
        shipping_cost: data.shipping_cost,
        quantity: data.quantity,
        payment_proof: photo,
      },
      { where: { id } }
    );
  },

  delete(id) {
    return Order.destroy({
      where: {
        id,
      },
    });
  },
};
