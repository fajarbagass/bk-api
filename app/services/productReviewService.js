const productReviewRepository = require("../repositories/productReviewRepository");
const uploadReviews = require("../utils/uploadReviews");

module.exports = {
  async createData(data, file) {
    try {
      const order_id = data.order_id;
      const rating = data.rating;
      const review = data.review;
      if (file === null) {
        return await productReviewRepository.create({
          order_id,
          rating,
          review,
        });
      } else {
        const picture = await uploadReviews.addPicture(file);
        return await productReviewRepository.create({
          order_id,
          rating,
          review,
          picture,
        });
      }
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
  async updateData(review, data, file) {
    try {
      const id = review.id;
      const picture = review.picture;
      const reviewData = await productReviewRepository.find(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Data ulasan tidak ditemukan",
        };
      }
      if (file === undefined) {
        await productReviewRepository.update(id, data);
      } else {
        if (picture === null) {
          const photo = await uploadReviews.addPicture(file);
          await productReviewRepository.update(id, data, photo);
        } else {
          const photo = await uploadReviews.updatePicture(file, review);
          await productReviewRepository.update(id, data, photo);
        }
      }
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
      await uploadReviews.deletePicture(reviewData);
      return productReviewRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },
};
