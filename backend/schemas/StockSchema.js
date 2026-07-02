const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  percent: {
    type: String,
    default: "0%",
  },

  isDown: {
    type: Boolean,
    default: false,
  },
});

module.exports = StockSchema;