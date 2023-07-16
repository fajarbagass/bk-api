const productReviewService = require("../../../services/productReviewService");

module.exports = {
  async createReview(req, res) {
    try {
      const data = req.body;
      const review = await productReviewService.createData(data);
      res.status(200).json({
        status: "success",
        data: review,
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
      const review = await productReviewService.findDataByUser(user);
      res.status(200).json({
        status: "success",
        data: review,
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
      const review = await productReviewService.findDataById(id);
      res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
      const review = await productReviewService.getAllData();
      res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async updateReview(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await productReviewService.updateData(id, data);
      res.status(200).json({
        status: "success",
        message: "Ulasan berhasil diubah",
      });
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
  async deleteReview(req, res) {
    try {
      const id = req.params.id;
      await productReviewService.deleteData(id);
      res.status(200).json({
        status: "success",
        message: "Ulasan berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
