const orderRepository = require("../repositories/orderRepository");
const uploadPayment = require("../utils/uploadPayment");

module.exports = {
  async createData(data) {
    try {
      return await orderRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  async findDataById(id) {
    try {
      const orderData = await orderRepository.find(id);
      if (!orderData) {
        throw {
          name: "orderNotFound",
          message: "Data pesanan tidak ditemukan",
        };
      }
      return orderData;
    } catch (error) {
      throw error;
    }
  },
  async findDataByUser(user) {
    try {
      return await orderRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  async findDataByCode(data) {
    try {
      return await orderRepository.filterByCode(data);
    } catch (error) {
      throw error;
    }
  },
  async getAllData() {
    return await orderRepository.getAll();
  },
  async updateData(order, data, file) {
    try {
      const id = order.id;
      const orderData = await orderRepository.find(id);

      if (!orderData) {
        throw {
          name: "orderNotFound",
          message: "Data pesanan tidak ditemukan",
        };
      }
      if (file === undefined || file === null) {
        await orderRepository.update(id, data);
      } else {
        const picture = await uploadPayment.addPicture(file);
        await orderRepository.update(id, data, picture);
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteData(id) {
    try {
      const orderData = await orderRepository.find(id);
      if (!orderData) {
        throw {
          name: "orderNotFound",
          message: "Data pesanan tidak ditemukan",
        };
      }
      await uploadPayment.deletePicture(orderData);
      return orderRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },
};
