const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const orderController = require("../controller/product/OrderController");
const ViewOrders = require("../controller/user/viewOrders");
const deleteOrderController = require("../controller/product/deleteOrder");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.post("/user-details", userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-user", allUsers);
router.post("/update-user", updateUser);

//product
router.post("/upload-product", UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", addToCartController);
router.get("/countAddToCartProduct", countAddToCartProduct);
router.post("/view-card-product", addToCartViewProduct);
router.post("/update-cart-product", updateAddToCartProduct);
router.post("/delete-cart-product", deleteAddToCartProduct);

//ordering
router.post("/order", orderController);
router.get("/get-orders", ViewOrders);
router.post("/delete-order", deleteOrderController);

module.exports = router;
