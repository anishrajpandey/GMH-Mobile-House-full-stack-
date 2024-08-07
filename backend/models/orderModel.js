const mongoose = require("mongoose");

const addToCart = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: { ref: "user", type: String },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", addToCart);

module.exports = OrderModel;
