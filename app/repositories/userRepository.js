const { User } = require("../models");

module.exports = {
  find(id) {
    return User.findByPk(id);
  },
  getAll() {
    return User.findAll({
      attributes: [
        "id",
        "role",
        "name",
        "email",
        "phone_number",
        "address",
        "picture",
      ],
    });
  },
  findByPhoneNumber(phone_number) {
    return User.findOne({
      where: {
        phone_number,
      },
    });
  },
  create(user) {
    return User.create(user);
  },
  update(id, data, photo) {
    return User.update(
      {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        address: data.address,
        picture: photo,
      },
      { where: { id } }
    );
  },
  delete(id) {
    return User.destroy({
      where: {
        id,
      },
    });
  },
  changePassword(id, password) {
    return User.update(
      {
        password,
      },
      { where: { id } }
    );
  },
};
