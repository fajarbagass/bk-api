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

// route carts
apiRouter.post(
  "/api/v1/cart",
  authorization.authorize,
  validations.cartValidation.cartCreateDataValidate,
  checkValidate,
  controllers.api.v1.cartController.createCart
);

apiRouter.get(
  "/api/v1/cart/user",
  authorization.authorize,
  controllers.api.v1.cartController.findByUser
);

apiRouter.get("/api/v1/cart", controllers.api.v1.cartController.getAll);

apiRouter.get("/api/v1/cart/:id", controllers.api.v1.cartController.findById);

apiRouter.put(
  "/api/v1/cart/:id",
  authorization.authorize,
  validations.cartValidation.cartUpdateDataValidate,
  checkValidate,
  controllers.api.v1.cartController.updateCart
);

apiRouter.delete(
  "/api/v1/cart/:id",
  authorization.authorize,
  controllers.api.v1.cartController.deleteCart
);

// route orders
apiRouter.post(
  "/api/v1/order",
  authorization.authorize,
  validations.orderValidation.orderDataValidate,
  checkValidate,
  controllers.api.v1.orderController.createOrder
);

apiRouter.get(
  "/api/v1/order/user",
  authorization.authorize,
  controllers.api.v1.orderController.findByUser
);
apiRouter.get(
  "/api/v1/order/data",
  controllers.api.v1.orderController.findByCode
);
apiRouter.get("/api/v1/order", controllers.api.v1.orderController.getAll);

apiRouter.get("/api/v1/order/:id", controllers.api.v1.orderController.findById);

apiRouter.patch(
  "/api/v1/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.updateOrder
);

apiRouter.delete(
  "/api/v1/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.deleteOrder
);

// route reviews
apiRouter.post(
  "/api/v1/review",
  authorization.authorize,
  validations.productReviewValidation.reviewDataValidate,
  checkValidate,
  controllers.api.v1.productReviewController.createReview
);
apiRouter.get(
  "/api/v1/review/user",
  authorization.authorize,
  controllers.api.v1.productReviewController.findByUser
);
apiRouter.get(
  "/api/v1/review",
  controllers.api.v1.productReviewController.getAll
);
apiRouter.get(
  "/api/v1/review/:id",
  controllers.api.v1.productReviewController.findById
);
apiRouter.patch(
  "/api/v1/review/:id",
  authorization.authorize,
  validations.productReviewValidation.reviewDataValidate,
  checkValidate,
  controllers.api.v1.productReviewController.updateReview
);
apiRouter.delete(
  "/api/v1/review/:id",
  authorization.authorize,
  controllers.api.v1.productReviewController.deleteReview
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
