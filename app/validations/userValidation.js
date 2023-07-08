const { body } = require("express-validator");
const userRepository = require("../repositories/userRepository");

module.exports = {
  loginDataValidate: [
    body("phone_number", "Nomor telepon harus diisi").exists(),
    body("phone_number", "Nomor telepon tidak sesuai").isNumeric(),
    body("password", "Kata sandi harus diisi").exists(),
  ],
  registerDataValidate: [
    body("name", "Nama harus diisi").exists(),
    body("phone_number", "Nomor telepon harus diisi").exists(),
    body("phone_number", "Nomor telepon tidak sesuai").isNumeric(),
    body(
      "phone_number",
      "Hanya nomor telepon Indonesia yang diperbolehkan"
    ).isMobilePhone("id-ID"),
    body("phone_number", "Nomor telepon tidak sesuai").custom(
      async (value = null) => {
        const user = await userRepository.findByPhoneNumber(value);
        if (user) {
          throw new Error("Nomor telepon sudah ada");
        }
      }
    ),
    body("password", "Kata sandi harus diisi").exists(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Kata sandi harus terdiri dari minimal 8 karakter"),
  ],
  updateDataValidate: [
    body("name", "Nama harus diisi").exists(),
    body("email", "Email harus diisi").exists(),
    body("email", "Email tidak sesuai").isEmail(),
    body("phone_number", "Nomor telepon harus diisi").exists(),
    body("phone_number", "Nomor telepon tidak sesuai").isNumeric(),
    body(
      "phone_number",
      "Hanya nomor telepon Indonesia yang diperbolehkan"
    ).isMobilePhone("id-ID"),
    body("address", "Alamat harus diisi").exists(),
  ],
  changePasswordDataValidate: [
    body("new_password", "Kata sandi harus diisi").exists(),
    body("new_password")
      .isLength({ min: 8 })
      .withMessage("Kata sandi harus terdiri dari minimal 8 karakter"),

    body("confirm_password", "Kata sandi harus diisi").exists(),
  ],
};
