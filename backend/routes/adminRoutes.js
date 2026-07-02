const router = require("express").Router();
const verifyToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const { getTradingVolume,getBuySellStats } = require("../controllers/tradingController");
const {
  getStats,
  getRecentUsers,
  getRecentOrders,
  getUserGrowth,
  getTopStocks,
  getSystemHealth,getMarketOverview,
} = require("../controllers/adminController");


router.use(verifyToken, isAdmin);

router.get("/stats", getStats);

router.get(
  "/recent-users",
  getRecentUsers
);

router.get(
  "/recent-orders",
  getRecentOrders
);

router.get(
  "/user-growth",
  getUserGrowth
);
router.get("/trading-volume", getTradingVolume);
router.get(
  "/top-stocks",
  getTopStocks
);
router.get("/buy-sell-stats", getBuySellStats);
router.get(
  "/system-health",
  getSystemHealth
);
router.get("/market-overview", getMarketOverview);

module.exports = router;