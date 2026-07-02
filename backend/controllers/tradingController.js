const { OrdersModel } = require("../model/OrdersModel");
const getBuySellStats = async (req, res) => {
  try {
    const buyOrders = await OrdersModel.countDocuments({
      mode: "BUY",
    });

    const sellOrders = await OrdersModel.countDocuments({
      mode: "SELL",
    });

    res.json({
      buyOrders,
      sellOrders,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const getTradingVolume = async (req, res) => {
  try {
    const volumes = await OrdersModel.aggregate([
      {
        $group: {
          _id: "$name",
          totalQty: { $sum: "$qty" },
        },
      },
      {
        $sort: { totalQty: -1 },
      },
    ]);

    res.json(volumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTradingVolume ,getBuySellStats};