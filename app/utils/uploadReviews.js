const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  addPicture(file) {
    const photo = file.picture;
    const lenPhoto = photo.data.length;
    const ext = path.extname(photo.name);
    const uniqueCharacters = crypto.randomBytes(3).toString("hex");
    const fileName = uniqueCharacters + photo.md5 + ext;
    const photoUrl = path.resolve(__dirname, "../../public/reviews/", fileName);
    const photoType = [".png", ".jpg", ".jpeg"];
    if (!photoType.includes(ext.toLocaleLowerCase())) {
      throw {
        name: "badRequest",
        message: "Tipe file foto tidak sesuai",
      };
    }
    if (lenPhoto > 5000000) {
      throw {
        name: "badRequest",
        message: "Ukuran foto tidak boleh lebih dari 5 MB",
      };
    }
    photo.mv(photoUrl, (err) => {
      if (err) {
        throw {
          name: err.name,
          message: err.message,
        };
      }
    });
    return fileName;
  },
  updatePicture(file, product_review) {
    console.log(product_review);
    let photo = "";
    const newPicture = file.picture;
    const photoSize = newPicture.data.length;
    const ext = path.extname(newPicture.name);
    const uniqueCharacters = crypto.randomBytes(3).toString("hex");
    photo = uniqueCharacters + newPicture.md5 + ext;
    const photoType = [".png", ".jpg", ".jpeg"];

    if (!photoType.includes(ext.toLocaleLowerCase())) {
      throw {
        name: "badRequest",
        message: "Tipe file foto tidak sesuai",
      };
    }
    if (photoSize > 5000000) {
      throw {
        name: "badRequest",
        message: "Ukuran foto tidak boleh lebih dari 5 MB",
      };
    }

    const pathPhoto = `./public/reviews/${product_review.picture}`;
    fs.unlinkSync(pathPhoto);
    newPicture.mv(`./public/reviews/${photo}`, (err) => {
      if (err) {
        throw {
          name: err.name,
          message: err.message,
        };
      }
    });
    return photo;
  },
  deletePicture(product_review) {
    if (product_review.picture !== null) {
      const pathPhoto = `./public/reviews/${product_review.picture}`;
      fs.unlinkSync(pathPhoto);
    }
  },
};
