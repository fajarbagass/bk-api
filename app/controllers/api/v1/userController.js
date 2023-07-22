const userServices = require("../../../services/userServices");

module.exports = {
  // melakukan login
  async login(req, res) {
    try {
      const data = req.body;
      const user = await userServices.login(data);
      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          token: user.token,
        },
      });
    } catch (error) {
      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else if (error.name === "wrongPhoneNumber") {
        res.status(401).json({
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
  // mendapatkan data user
  getCurrentUser(req, res) {
    const data = req.user;
    res.status(200).json({
      status: "success",
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        phone_number: data.phone_number,
        address: data.address,
        picture: data.picture,
      },
    });
  },
  // melakukan registrasi
  async register(req, res) {
    try {
      const data = req.body;
      const user = await userServices.register(data);
      res.status(201).json({
        status: "success",
        data: user,
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
  // mendapatkan semua data user
  async getAllUsers(req, res) {
    try {
      const data = await userServices.findAll();
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // melakukan edit data user
  async update(req, res) {
    const data = req.body;
    const user = req.user;
    const file = req.files;
    try {
      if (req.files) {
        await userServices.update(user, data, file);
        res.status(200).json({
          status: "success",
          message: "Pengguna berhasil diperbarui",
        });
      } else {
        await userServices.update(user, data);
        res.status(200).json({
          status: "success",
          message: "Pengguna berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "userNotFound") {
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
  async delete(req, res) {
    try {
      const id = req.params.id;
      const admin = req.user;
      await userServices.delete(id, admin);
      res.status(200).json({
        status: "success",
        message: "Pengguna berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "userNotFound") {
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
  async changePassword(req, res) {
    try {
      const data = req.body;
      await userServices.changePassword(req.user.id, data);
      res.status(200).json({
        status: "success",
        message: "Kata sandi berhasil diubah",
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
};
