const userRepository = require("../repositories/userRepository");
const {
  checkPassword,
  createToken,
  encryptPassword,
} = require("../utils/authUtils");
const uploadUsers = require("../utils/uploadUsers");

module.exports = {
  async register(data) {
    try {
      const name = data.name;
      const phone_number = data.phone_number;
      const role = "client";

      const password = await encryptPassword(data.password);
      return await userRepository.create({
        name,
        phone_number,
        role,
        password,
      });
    } catch (error) {
      throw error;
    }
  },
  async login(data) {
    try {
      const phone_number = data.phone_number;
      const password = data.password;

      const user = await userRepository.findByPhoneNumber(phone_number);
      if (!user) {
        throw {
          name: "wrongPhoneNumber",
          message: "Nomor telepon atau kata sandi salah",
        };
      }
      const isPasswordCorrect = await checkPassword(user.password, password);
      if (!isPasswordCorrect) {
        throw {
          name: "wrongPhoneNumber",
          message: "Nomor telepon atau kata sandi salah",
        };
      }
      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        token,
      };
    } catch (error) {
      throw error;
    }
  },

  async find(id) {
    return await userRepository.find(id);
  },

  async findAll() {
    try {
      return await userRepository.getAll();
    } catch (error) {
      throw error;
    }
  },

  async update(user, data, file) {
    try {
      const id = user.id;
      const picture = user.picture;
      const userData = await userRepository.find(user.id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (file === undefined) {
        await userRepository.update(id, data);
      } else {
        if (picture === null) {
          const photo = await uploadUsers.addPicture(file);
          await userRepository.update(id, data, photo);
        } else {
          const photo = await uploadUsers.updatePicture(file, user);
          await userRepository.update(id, data, photo);
        }
      }
    } catch (error) {
      throw error;
    }
  },
  async delete(id, admin) {
    try {
      const userData = await userRepository.find(id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (admin.role === "admin") {
        return (
          await uploadUsers.deletePicture(userData), userRepository.delete(id)
        );
      } else {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  async changePassword(id, data) {
    try {
      const user = await userRepository.find(id);
      if (!user) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (data.old_password === data.new_password) {
        throw {
          name: "badRequest",
          message:
            "Kata sandi baru tidak boleh sama dengan kata sandi lama anda",
        };
      }
      if (data.new_password === data.confirm_password) {
        // equals password and confirmPassword
        const passwordCompare = await checkPassword(
          user.password,
          data.old_password
        );
        if (!passwordCompare) {
          throw {
            name: "badRequest",
            message: "Kata sandi lama salah",
          };
        }

        const encryptedPassword = await encryptPassword(data.new_password);
        return userRepository.changePassword(id, encryptedPassword);
      } else {
        throw {
          name: "badRequest",
          message: "Kata sandi baru dan kata sandi konfirmasi tidak sama",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
