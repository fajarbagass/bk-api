const { body } = require("express-validator");

module.exports = {
  cartCreateDataValidate: [
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
      .withMessage("Jumlah order harus diisi"),
  ],
  cartUpdateDataValidate: [
    body("quantity")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Jumlah order harus diisi"),
  ],
};
