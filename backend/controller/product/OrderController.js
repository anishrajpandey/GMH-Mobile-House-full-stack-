const OrderModel = require("../../models/orderModel");

const orderController = async (req, res) => {
  try {
    const { productId, userId } = req?.body;
    // const currentUser = req.userId
    console.log(productId, userId);

    const isProductAvailable = await OrderModel.findOne({
      productId,
      userId,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already Ordered!",
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
    const newAddToCart = new OrderModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message:
        "Product Ordered Successfully. You will soon receive a call from Us regarding the delivery in 1-2 days. ",
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

module.exports = orderController;
