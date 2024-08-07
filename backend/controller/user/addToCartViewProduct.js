const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  const { userId } = req?.body;

  try {
    const allProduct = await addToCartModel
      .find({
        userId,
      })
      .populate("productId")
      .populate("userId");

    res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
