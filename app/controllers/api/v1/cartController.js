const cartService = require("../../../services/cartServices");

module.exports = {
  async createCart(req, res) {
    try {
      const data = req.body;
      const cart = await cartService.createData(data);
      console.log(data);
      res.status(200).json({
        status: "success",
        data: cart,
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
      const cart = await cartService.findDataByUser(user);
      res.status(200).json({
        status: "success",
        data: cart,
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
      const cart = await cartService.findDataById(id);
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } catch (error) {
      if (error.name === "cartNotFound") {
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
      const cart = await cartService.getAllData();
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async updateCart(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await cartService.updateData(id, data);
      res.status(200).json({
        status: "success",
        message: "Troli berhasil diubah",
      });
    } catch (error) {
      if (error.name === "cartNotFound") {
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
  async deleteCart(req, res) {
    try {
      const id = req.params.id;
      await cartService.deleteData(id);
      res.status(200).json({
        status: "success",
        message: "Troli berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "cartNotFound") {
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
