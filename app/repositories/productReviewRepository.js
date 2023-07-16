const { Product_Review, Order, Product, User } = require("../models");

module.exports = {
  find(id) {
    return Product_Review.findOne({
      include: [
        {
          model: Order,
          attributes: [
            "id",
            "code",
            "quantity",
            "total_amount",
            "status",
            "payment_proof",
          ],
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
        },
      ],
      where: {
        id,
      },
      attributes: ["id", "rating", "review"],
      order: [["id", "DESC"]],
    });
  },
  findByUser(user) {
    return Product_Review.findAll({
      include: [
        {
          model: Order,
          attributes: [
            "id",
            "code",
            "quantity",
            "total_amount",
            "status",
            "payment_proof",
          ],
          where: {
            user_id: user,
          },
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
        },
      ],
      attributes: ["id", "rating", "review"],
      order: [["createdAt", "DESC"]],
    });
  },
  getAll() {
    return Product_Review.findAll({
      include: [
        {
          model: Order,
          attributes: [
            "id",
            "code",
            "quantity",
            "total_amount",
            "status",
            "payment_proof",
          ],
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
        },
      ],
      attributes: ["id", "rating", "review"],
      order: [["createdAt", "DESC"]],
    });
  },
  create(data) {
    return Product_Review.create({
      order_id: data.order_id,
      rating: data.rating,
      review: data.review,
    });
  },
  update(id, data) {
    return Product_Review.update(
      {
        rating: data.rating,
        review: data.review,
      },
      {
        where: { id },
      }
    );
  },
  delete(id) {
    return Product_Review.destroy({
      where: { id },
    });
  },
};
