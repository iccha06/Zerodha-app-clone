const UserModel = require("../model/UserModel");
const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const  StockModel  = require("../model/StockModel");
const os = require("os");

const getStats = async (req, res) => {
  try {
    const users = await UserModel.countDocuments();
    const orders = await OrdersModel.countDocuments();
    const holdings = await HoldingsModel.countDocuments();
    const stocks = await HoldingsModel.distinct("name");

    const buyOrders = await OrdersModel.countDocuments({
      mode: "BUY",
    });

    const sellOrders = await OrdersModel.countDocuments({
      mode: "SELL",
    });

    // Users active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const activeUsers = await UserModel.countDocuments({
      lastSeen: { $gte: fiveMinutesAgo },
    });

    const inactiveUsers = await UserModel.countDocuments({
      $or: [
        { lastSeen: { $lt: fiveMinutesAgo } },
        { lastSeen: { $exists: false } },
      ],
    });

    const volume = await OrdersModel.aggregate([
      {
        $group: {
          _id: null,
          totalVolume: {
            $sum: "$qty",
          },
        },
      },
    ]);

    res.json({
      users,
      activeUsers,
      inactiveUsers,
      orders,
      holdings,
      stocks: stocks.length,
      buyOrders,
      sellOrders,
      totalVolume:
        volume.length > 0 ? volume[0].totalVolume : 0,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getRecentUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const updatedUsers = users.map((user) => {
      const status =
        user.lastSeen && user.lastSeen >= fiveMinutesAgo
          ? "Active"
          : "Inactive";


      return {
        ...user.toObject(),
        status,
      };
    });

    res.json(updatedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getRecentOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserGrowth = async (req, res) => {
  try {
    const growth = await UserModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          users: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json(growth);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getTopStocks = async (req, res) => {
  try {
    const stocks = await OrdersModel.aggregate([
      {
        $group: {
          _id: "$name",
          trades: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          trades: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(stocks);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getSystemHealth = async (req, res) => {
  res.json({
    uptime: process.uptime(),
    memoryUsage:
      process.memoryUsage().heapUsed /
      1024 /
      1024,
    cpuLoad: os.loadavg()[0],
  });
};
const getMarketOverview = async (req, res) => {
  try {
    const stocks = await StockModel.find();

    if (!stocks.length) {
      return res.json({
        topGainer: {},
        topLoser: {},
        mostTraded: {},
      });
    }

    // Convert "3.54%" or "-0.09%" to number
    const parsePercent = (value) =>
      parseFloat(String(value).replace("%", "")) || 0;

    // Sort stocks by daily percentage change
    const sortedStocks = [...stocks].sort(
      (a, b) => parsePercent(b.percent) - parsePercent(a.percent)
    );

    const topGainer = sortedStocks[0];
    const topLoser = sortedStocks[sortedStocks.length - 1];

    // Find most traded stock
    const traded = await OrdersModel.aggregate([
      {
        $group: {
          _id: "$name",
          volume: { $sum: "$qty" },
        },
      },
      {
        $sort: {
          volume: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    let mostTraded = {};

    if (traded.length > 0) {
      const stock = await StockModel.findOne({
        symbol: traded[0]._id,
      });

      mostTraded = {
        symbol: traded[0]._id,
        price: stock ? stock.price : 0,
        volume: traded[0].volume,
      };
    }

    res.json({
      topGainer: {
        symbol: topGainer.symbol,
        price: topGainer.price,
        change: parsePercent(topGainer.percent),
      },

      topLoser: {
        symbol: topLoser.symbol,
        price: topLoser.price,
        change: parsePercent(topLoser.percent),
      },

      mostTraded,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch market overview",
    });
  }
};
module.exports = {
  getStats,
  getRecentUsers,
  getRecentOrders,
  getUserGrowth,
  getTopStocks,
  getSystemHealth,getMarketOverview,
};