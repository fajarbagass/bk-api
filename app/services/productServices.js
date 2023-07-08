const productRepository = require("../repositories/productRepository");
const uploadProducts = require("../utils/uploadProducts");

module.exports = {
  async addData(data, file, admin) {
    try {
      const role = admin;
      const code = data.code;
      const type = data.type;
      const size = data.size;
      const name = data.name;
      const color = data.color;
      const price = data.price;
      const pieces = data.pieces;
      const surface = data.surface;
      const picture = await uploadProducts.addPicture(file);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      }
      if (file === null || file === undefined) {
        return await productRepository.create({
          code,
          type,
          size,
          name,
          color,
          price,
          pieces,
          surface,
        });
      } else {
        return await productRepository.create({
          code,
          type,
          size,
          name,
          color,
          price,
          pieces,
          surface,
          picture,
        });
      }
    } catch (error) {
      console.log(file);
      throw error;
    }
  },
  async deleteData(user, admin) {
    try {
      const productData = await productRepository.find(user.id);
      if (!productData) {
        throw {
          name: "productNotFound",
          message: "Produk tidak ditemukan",
        };
      }
      if (admin.role === "admin") {
        await uploadProducts.deletePicture(productData);
        productRepository.delete(user.id);
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
  async findData(id) {
    try {
      const product = await productRepository.find(id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Produk tidak ditemukan",
        };
      }
      return product;
    } catch (error) {
      throw error;
    }
  },
  async getAllData() {
    return await productRepository.getAll();
  },

  async updateData(user, product, data, file) {
    try {
      const id = product.id;
      const picture = product.picture;
      const productData = await productRepository.find(id);
      if (user.role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      }
      if (!productData) {
        throw {
          name: "productNotFound",
          message: "Produk tidak ditemukan",
        };
      }
      if (file === undefined) {
        await productRepository.update(id, data);
      } else {
        if (picture === null) {
          const photo = await uploadProducts.addPicture(file);
          await productRepository.update(id, data, photo);
        } else {
          const photo = await uploadProducts.updatePicture(file, product);
          await productRepository.update(id, data, photo);
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
