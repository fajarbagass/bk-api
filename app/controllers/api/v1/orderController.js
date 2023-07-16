const orderService = require("../../../services/orderService");

module.exports = {
  async createOrder(req, res) {
    try {
      const data = req.body;
      const order = await orderService.createData(data);
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      if (
        error.name === "badRequest" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },

  async findByUser(req, res) {
    try {
      const user = req.user.id;
      const order = await orderService.findDataByUser(user);
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async findById(req, res) {
    try {
      const id = req.params.id;
      const order = await orderService.findDataById(id);
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },

  async getAll(req, res) {
    try {
      const order = await orderService.getAllData();
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async updateOrder(req, res) {
    const id = req.params.id;
    const data = req.body;
    const file = req.files;
    const order = await orderService.findDataById(id);
    try {
      if (req.files) {
        await orderService.updateData(order, data, file);
        res.status(200).json({
          status: "success",
          message: "Pesanan berhasil diperbarui",
        });
      } else {
        await orderService.updateData(order, data);
        res.status(200).json({
          status: "success",
          message: "Pesanan berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else if (
        error.name === "badRequest" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await orderService.deleteData(id);
      res.status(200).json({
        status: "success",
        message: "Pesanan berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
};
