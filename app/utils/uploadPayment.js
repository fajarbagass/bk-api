const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  addPicture(file) {
    const photo = file.payment_proof;
    const lenPhoto = photo.data.length;
    const ext = path.extname(photo.name);
    const uniqueCharacters = crypto.randomBytes(3).toString("hex");
    const fileName = uniqueCharacters + photo.md5 + ext;
    const photoUrl = path.resolve(
      __dirname,
      "../../public/payment_proof/",
      fileName
    );

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
  deletePicture(order) {
    if (order.payment_proof !== null) {
      const pathPhoto = `./public/payment_proof/${order.payment_proof}`;
      fs.unlinkSync(pathPhoto);
    }
  },
};
