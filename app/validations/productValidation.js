const { body } = require("express-validator");
const { picture } = require("../../../tokoku-api/app/utils/cloudinary");
module.exports = {
  productDataValidate: [
    body("code").exists().not().isEmpty().withMessage("Kode harus diisi"),
    body("type").exists().not().isEmpty().withMessage("Tipe harus diisi"),
    body("size").exists().not().isEmpty().withMessage("Ukuran harus diisi"),
    body("name").exists().not().isEmpty().withMessage("Nama harus diisi"),
    body("color").exists().not().isEmpty().withMessage("Warna harus diisi"),
    body("price")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Harga harus diisi")
      .isNumeric()
      .withMessage("Harga tidak sesuai"),
    body("pieces")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Potongan harus diisi")
      .isNumeric()
      .withMessage("Potongan tidak sesuai"),
    body("surface")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Permukaan harus diisi"),
  ],
};
