const StockModel = require("../model/StockModel");

// GET ALL STOCKS
const getAllStocks = async (req, res) => {
  try {
    const stocks = await StockModel.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD STOCK
const addStock = async (req, res) => {
  try {
    const {
  symbol,
  companyName,
  price,
  availableQuantity,
} = req.body;

    const stock = new StockModel({
  symbol,
  companyName,
  price,
  availableQuantity,
});

    await stock.save();

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE STOCK
const deleteStock = async (req, res) => {
  try {
    await StockModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Stock deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllStocks,
  addStock,
  deleteStock,
};