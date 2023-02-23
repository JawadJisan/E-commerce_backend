const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductsDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// router.route("/products").get(isAuthenticatedUser, getAllProducts)
// router.route("/products").get(authorizeRoles("admin"),getAllProducts)
router.route("/products").get(getAllProducts)

router.route("/product/:id").get(getProductsDetails)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/review").get(getProductReviews).delete(deleteReview)

router
    .route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router