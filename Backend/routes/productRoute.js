const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getAProduct,
  createProductsReview,
  getAllReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getAProduct);
router.route("/review").put(isAuthenticatedUser, createProductsReview);
router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
