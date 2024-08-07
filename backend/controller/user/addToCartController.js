const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId, userId } = req?.body;
    // const currentUser = req.userId

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId,
    });

    console.log("isProductAvailable   ", isProductAvailable, userId, productId);

    if (isProductAvailable) {
      return res.json({
        message: "Already exits in Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId,
    };
    if (!userId) {
      return res.json({
        success: false,
        error: true,
        message: "Please Login",
      });
    }
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added in Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
