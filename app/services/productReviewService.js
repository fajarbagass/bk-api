const productReviewRepository = require("../repositories/productReviewRepository");

module.exports = {
  async createData(data) {
    try {
      return await productReviewRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  async findDataById(id) {
    try {
      const reviewData = await productReviewRepository.find(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Data ulasan tidak ditemukan",
        };
      }
      return reviewData;
    } catch (error) {
      throw error;
    }
  },
  async findDataByUser(user) {
    try {
      return await productReviewRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  async getAllData() {
    return await productReviewRepository.getAll();
  },
  async updateData(id, data) {
    try {
      const reviewData = await productReviewRepository.find(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Data ulasan tidak ditemukan",
        };
      }
      return productReviewRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  },
  async deleteData(id) {
    try {
      const reviewData = await productReviewRepository.find(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Data ulasan tidak ditemukan",
        };
      }
      return productReviewRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },
};
