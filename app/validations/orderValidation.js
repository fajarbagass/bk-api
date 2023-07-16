const { body } = require("express-validator");

module.exports = {
  orderDataValidate: [
    body("code").exists().not().isEmpty().withMessage("Kode harus diisi"),
    body("user_id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("ID user harus diisi")
      .isNumeric()
      .withMessage("ID user tidak sesuai"),
    body("product_id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("ID produk harus diisi")
      .isNumeric()
      .withMessage("ID produk tidak sesuai"),
    body("quantity")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Jumlah order harus diisi")
      .isNumeric()
      .withMessage("Jumlah order tidak sesuai"),
    body("total_amount")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Total harga harus diisi")
      .isNumeric()
      .withMessage("Total harga tidak sesuai"),
    body("status").exists().not().isEmpty().withMessage("Status harus diisi"),
  ],
};
