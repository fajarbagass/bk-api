const productService = require("../../../services/productServices");

module.exports = {
  async addProduct(req, res) {
    const data = req.body;
    const file = req.files;
    const admin = req.user.role;
    try {
      const product = await productService.addData(data, file, admin);
      res.status(200).json({
        status: "succes",
        data: product,
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
  async deleteProduct(req, res) {
    try {
      const user = req.params;
      const admin = req.user;
      await productService.deleteData(user, admin);
      res.status(200).json({
        status: "success",
        message: "Produk berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "productNotFound") {
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
  async findProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.findData(id);
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      if (error.name === "productNotFound") {
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
  async getAllProduct(req, res) {
    try {
      const products = await productService.getAllData();
      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async updateProduct(req, res) {
    const id = req.params.id;
    const data = req.body;
    const user = req.user;
    const file = req.files;
    const product = await productService.findData(id);
    try {
      if (req.files) {
        await productService.updateData(user, product, data, file);
        res.status(200).json({
          status: "success",
          message: "Produk berhasil diperbarui",
        });
      } else {
        await productService.updateData(user, product, data);
        res.status(200).json({
          status: "success",
          message: "Produk berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "productNotFound") {
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
};
