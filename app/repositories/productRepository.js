const { Product } = require("../models");

module.exports = {
  find(id) {
    return Product.findByPk(id);
  },
  getAll() {
    return Product.findAll();
  },
  create(product) {
    return Product.create(product);
  },
  update(id, data, photo) {
    return Product.update(
      {
        code: data.code,
        type: data.type,
        size: data.size,
        name: data.name,
        color: data.color,
        price: data.price,
        pieces: data.pieces,
        surface: data.surface,
        picture: photo,
      },
      { where: { id } }
    );
  },
  delete(id) {
    return Product.destroy({
      where: {
        id,
      },
    });
  },
};
