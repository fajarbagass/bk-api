const cartRepository = require("../repositories/cartRepository");

module.exports = {
  async createData(data) {
    try {
      return await cartRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  async findDataById(id) {
    try {
      const cartData = await cartRepository.find(id);
      if (!cartData) {
        throw {
          name: "cartNotFound",
          message: "Data troli tidak ditemukan",
        };
      }
      return cartData;
    } catch (error) {
      throw error;
    }
  },
  async findDataByUser(user) {
    try {
      return await cartRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  async getAllData() {
    return await cartRepository.getAll();
  },
  async updateData(id, data) {
    try {
      const cartData = await cartRepository.find(id);
      if (!cartData) {
        throw {
          name: "cartNotFound",
          message: "Data troli tidak ditemukan",
        };
      }
      return cartRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  },
  async deleteData(id) {
    try {
      const cartData = await cartRepository.find(id);
      if (!cartData) {
        throw {
          name: "cartNotFound",
          message: "Data troli tidak ditemukan",
        };
      }
      return cartRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },
};
