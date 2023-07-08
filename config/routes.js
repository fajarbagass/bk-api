const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();
const validations = require("../app/validations");
const checkValidate = require("../app/middlewares/checkValidate");
const authorization = require("../app/middlewares/authorization");

// route users
apiRouter.post(
  "/api/v1/auth/login",
  validations.userValidation.loginDataValidate,
  checkValidate,
  controllers.api.v1.userController.login
);
apiRouter.get(
  "/api/v1/auth/user",
  authorization.authorize,
  controllers.api.v1.userController.getCurrentUser
);
apiRouter.post(
  "/api/v1/auth/register",
  validations.userValidation.registerDataValidate,
  checkValidate,
  controllers.api.v1.userController.register
);
apiRouter.get(
  "/api/v1/auth/getAllUser",
  controllers.api.v1.userController.getAllUsers
);
apiRouter.patch(
  "/api/v1/auth/user/:id",
  authorization.authorize,
  validations.userValidation.updateDataValidate,
  checkValidate,
  controllers.api.v1.userController.update
);
apiRouter.delete(
  "/api/v1/auth/user/:id",
  authorization.authorize,
  controllers.api.v1.userController.delete
);
apiRouter.put(
  "/api/v1/auth/user/password",
  authorization.authorize,
  validations.userValidation.changePasswordDataValidate,
  checkValidate,
  controllers.api.v1.userController.changePassword
);

// route products
apiRouter.post(
  "/api/v1/auth/product",
  authorization.authorize,
  validations.productValidation.productDataValidate,
  checkValidate,
  controllers.api.v1.productController.addProduct
);
apiRouter.delete(
  "/api/v1/auth/product/:id",
  authorization.authorize,
  controllers.api.v1.productController.deleteProduct
);
apiRouter.get(
  "/api/v1/product/:id",
  controllers.api.v1.productController.findProduct
);
apiRouter.get(
  "/api/v1/product",
  controllers.api.v1.productController.getAllProduct
);
apiRouter.patch(
  "/api/v1/auth/product/:id",
  authorization.authorize,
  validations.productValidation.productDataValidate,
  checkValidate,
  controllers.api.v1.productController.updateProduct
);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
