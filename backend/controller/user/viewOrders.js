const OrderModel = require("../../models/orderModel");

const ViewOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find()
      .populate("productId")
      .populate("userId");

    res.json({
      data: allOrders,
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

module.exports = ViewOrders;
