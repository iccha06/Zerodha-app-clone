import React, { useEffect, useState } from "react";
import axios from "axios";

import KPISection from "./components/KPISection";
import RecentUsers from "./components/RecentUsers";
import RecentOrders from "./components/RecentOrders";
import UserGrowthChart from "./components/UserGrowthChart";
import SystemHealth from "./components/SystemHealth";
import TradingVolumeChart from "./components/TradingVolumeChart";
import BuySellChart from "./components/BuySellChart";
import MarketOverview from "./components/MarketOverview";
import "./components/MarketOverview.css";
import "./components/Charts.css";
import "./components/Recent.css";

import "./AdminSummary.css";

const AdminSummary = () => {
  const [stats, setStats] = useState({
    users: 0,
    holdings: 0,
    orders: 0,
    stocks: 0,
    totalVolume: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [growthData, setGrowthData] = useState([]);
  const [tradingVolume, setTradingVolume] = useState([]);
  const [buySellStats, setBuySellStats] = useState({
  buyOrders: 0,
  sellOrders: 0,
});
  const [topStocks, setTopStocks] = useState([]);
  const [health, setHealth] = useState({});
  const [marketData, setMarketData] = useState({
  topGainer: {},
  topLoser: {},
  mostTraded: {},
});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetchDashboardData();

  const interval = setInterval(() => {
    fetchDashboardData();
  }, 10000); // Refresh every 10 seconds

  return () => clearInterval(interval);
}, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
    try {
     const [
  statsRes,
  usersRes,
  ordersRes,
  growthRes,
  stocksRes,
  healthRes,
  volumeRes,
  marketRes,
  buySellRes,
] = await Promise.all([
  axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/recent-users`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/recent-orders`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/user-growth`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/top-stocks`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/system-health`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/trading-volume`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/market-overview`, config),
  axios.get(`${import.meta.env.VITE_API_URL}/admin/buy-sell-stats`, config),
]);

      setStats(statsRes.data);
      setRecentUsers(usersRes.data);
      //console.log(usersRes.data);
      setTradingVolume(volumeRes.data);
      setBuySellStats(buySellRes.data);
      setRecentOrders(ordersRes.data);
      //console.log(ordersRes.data);
      setGrowthData(growthRes.data);
      setTopStocks(stocksRes.data);
      setHealth(healthRes.data);
      setMarketData(marketRes.data);
    } catch (err) {
      console.error("Admin dashboard error:", err);
      setError("Couldn't load dashboard data. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Monitor users, trades and platform activity</p>
        </div>
        <button className="refresh-btn" onClick={fetchDashboardData} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      {/* KPI Cards */}
      <KPISection stats={stats} />

      {/* Analytics Section */}
       <div className="analytics-grid">
  <UserGrowthChart growthData={growthData} />

  <TradingVolumeChart volumeData={tradingVolume} />

  <BuySellChart
    buyOrders={buySellStats.buyOrders}
    sellOrders={buySellStats.sellOrders}
  />
</div>
      {/* Tables */}
      <div className="admin-grid">
        <RecentUsers users={recentUsers} />
        <RecentOrders orders={recentOrders} />
      </div>
      <MarketOverview
  topGainer={marketData.topGainer}
  topLoser={marketData.topLoser}
  mostTraded={marketData.mostTraded}
  health={{
    status: "All Systems Operational",
  }}
/>

    </div>
  );
};

export default AdminSummary;

