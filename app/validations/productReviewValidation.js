const { body } = require("express-validator");

module.exports = {
  reviewDataValidate: [
    body("rating")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Penilaian harus diisi")
      .isNumeric()
      .withMessage("Penilaian tidak sesuai"),
  ],
};
