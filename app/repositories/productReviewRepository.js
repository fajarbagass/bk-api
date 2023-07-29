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
            "shipping_cost",
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
        },
      ],
      where: {
        id,
      },
      attributes: ["id", "rating", "review", "picture"],
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
            "shipping_cost",
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
        },
      ],
      attributes: ["id", "rating", "review", "picture"],
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
            "shipping_cost",
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
        },
      ],
      attributes: ["id", "rating", "review", "picture"],
      order: [["createdAt", "DESC"]],
    });
  },
  create(review) {
    return Product_Review.create(review);
  },
  update(id, data, photo) {
    return Product_Review.update(
      {
        rating: data.rating,
        review: data.review,
        picture: photo,
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
