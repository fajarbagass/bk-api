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
        "total_amount",
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
        "total_amount",
        "status",
        "payment_proof",
      ],
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
        "total_amount",
        "status",
        "payment_proof",
      ],
    });
  },

  create(data) {
    return Order.create({
      code: data.code,
      user_id: data.user_id,
      product_id: data.product_id,
      quantity: data.quantity,
      total_amount: data.total_amount,
      status: data.status,
    });
  },

  update(id, data, photo) {
    return Order.update(
      {
        status: data.status,
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
