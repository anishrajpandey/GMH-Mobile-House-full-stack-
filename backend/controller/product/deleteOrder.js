const OrderModel = require("../../models/orderModel");

const deleteOrderController = async (req, res) => {
  try {
    const deleteProduct = await OrderModel.deleteOne({
      _id: req.body.id,
    });

    res.json({
      message: "Order Deleted ",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteOrderController;
