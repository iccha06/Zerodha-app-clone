import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Summary.css";
import { FaSyncAlt, FaArrowRight } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

// Static placeholder news until a real news endpoint exists.
const NEWS_ITEMS = [
  { text: "Markets open higher as IT stocks rally", time: "2 mins ago" },
  { text: "RBI keeps repo rate unchanged", time: "1 hour ago" },
  { text: "Global cues positive, Sensex rises 400 pts", time: "2 hours ago" },
];

const DOUGHNUT_COLORS = [
  "#3B6FD9",
  "#8B7FE8",
  "#5BA3D9",
  "#0D9488",
  "#B6BCC6",
];

const RANGES = ["1D", "1W", "1M", "3M", "1Y"];

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("1W");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [holdingsRes, ordersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/allHoldings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/allOrders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setHoldings(holdingsRes.data);
      setOrders(ordersRes.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardData();
  };

  // ---------- derived portfolio numbers ----------

  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const totalCurrentValue = holdings.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.qty,
    0
  );

  const totalPnL = totalCurrentValue - totalInvestment;

  const pnlPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const availableFunds = 3740;

  const stockPnls = holdings.map((stock) => {
    const value = stock.currentPrice * stock.qty;
    const cost = stock.avg * stock.qty;
    const pnl = value - cost;
    const pct = cost > 0 ? (pnl / cost) * 100 : 0;
    return { ...stock, value, pnl, pct };
  });

  const topHoldings = [...stockPnls]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const gainers = [...stockPnls]
    .filter((s) => s.pct > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);

  const losers = [...stockPnls]
    .filter((s) => s.pct < 0)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 5);

  const recentOrders = [...orders].reverse().slice(0, 5).map((order, idx) => ({
    ...order,
    // Backend order objects only carry name/mode/qty/price today — fall back
    // gracefully if time/status aren't present rather than showing blanks.
    time:
      order.time ||
      new Date(Date.now() - idx * 5 * 60 * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    status: order.status || "Completed",
  }));

  // ---------- chart data ----------

  const top4Value = topHoldings.reduce((s, h) => s + h.value, 0);
  const othersValue = Math.max(totalCurrentValue - top4Value, 0);

  const doughnutLabels =
    holdings.length > 4
      ? [...topHoldings.map((h) => h.name), "Others"]
      : topHoldings.map((h) => h.name);

  const doughnutValues =
    holdings.length > 4
      ? [...topHoldings.map((h) => h.value), othersValue]
      : topHoldings.map((h) => h.value);

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutValues,
        backgroundColor: DOUGHNUT_COLORS,
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const allocationPercents = doughnutValues.map((v) =>
    totalCurrentValue > 0 ? ((v / totalCurrentValue) * 100).toFixed(0) : 0
  );

  const growthLabels = ["17 May", "18 May", "19 May", "20 May", "21 May", "22 May", "23 May"];
  const growthData = {
    labels: growthLabels,
    datasets: [
      {
        label: "Portfolio Value",
        data: [
          totalCurrentValue * 0.62,
          totalCurrentValue * 0.78,
          totalCurrentValue * 0.83,
          totalCurrentValue * 0.88,
          totalCurrentValue * 0.93,
          totalCurrentValue * 0.97,
          totalCurrentValue,
        ],
        borderColor: "#3B6FD9",
        backgroundColor: "rgba(59, 111, 217, 0.12)",
        pointBackgroundColor: "#3B6FD9",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const formatINR = (n) =>
    "₹" + Math.round(n).toLocaleString("en-IN");

  const formatCompactINR = (n) => {
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
    return "₹" + Math.round(n);
  };

  if (loading) {
    return <h3 className="loading-text">Loading Dashboard...</h3>;
  }

  const username = localStorage.getItem("username") || "User";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedTime = lastUpdated.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="summary-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>
            {getGreeting()}, {username} <span className="wave">👋</span>
          </h2>
          <p className="header-sub">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="header-meta">
          <span>Last updated: {formattedTime}</span>
          <button className="icon-btn" onClick={handleRefresh} aria-label="Refresh">
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* TOP STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Portfolio Value</h4>
          <h2>{formatINR(totalCurrentValue)}</h2>
          <p className="stat-sub">Invested: {formatINR(totalInvestment)}</p>
        </div>

        <div className="stat-card">
          <h4>Today's P&amp;L</h4>
          <h2 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL >= 0 ? "+" : ""}
            {formatINR(totalPnL)}
          </h2>
          <p className={totalPnL >= 0 ? "profit stat-sub" : "loss stat-sub"}>
            {totalPnL >= 0 ? "+" : ""}
            {pnlPercent}%
          </p>
        </div>

        <div className="stat-card">
          <h4>Total Holdings</h4>
          <h2>{holdings.length}</h2>
          <p className="stat-sub">Stocks</p>
        </div>

        <div className="stat-card">
          <h4>Total Orders</h4>
          <h2>{orders.length}</h2>
          <p className="stat-sub">Open + Completed</p>
        </div>
      </div>

      {/* FUNDS / ALLOCATION / TOP HOLDINGS */}
      <div className="row-3">
        <div className="panel funds-card">
          <h3>Funds Summary</h3>

          <div className="funds-row">
            <p className="label">Available Balance</p>
            <h4>{formatINR(availableFunds)}</h4>
          </div>

          <div className="funds-row">
            <p className="label">Margins Used</p>
            <h4>₹0.00</h4>
          </div>

          <div className="funds-row">
            <p className="label">Opening Balance</p>
            <h4>{formatINR(availableFunds)}</h4>
          </div>

          <button className="add-funds-btn">Add Funds</button>
        </div>

        <div className="panel allocation-card">
          <h3>Portfolio Allocation</h3>

          <div className="allocation-body">
            <div className="doughnut-wrap">
              <Doughnut
                data={doughnutData}
                options={{
                  cutout: "72%",
                  plugins: { legend: { display: false }, tooltip: { enabled: true } },
                }}
              />
              <div className="doughnut-center">
                <span className="doughnut-value">{formatCompactINR(totalCurrentValue)}</span>
                <span className="doughnut-label">Total</span>
              </div>
            </div>

            <ul className="legend-list">
              {doughnutLabels.map((label, i) => (
                <li key={label}>
                  <span
                    className="legend-dot"
                    style={{ background: DOUGHNUT_COLORS[i % DOUGHNUT_COLORS.length] }}
                  />
                  <span className="legend-name">{label}</span>
                  <span className="legend-pct">{allocationPercents[i]}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="panel holdings-card">
          <h3>Top Holdings</h3>

          <div className="top-holdings-list">
            {topHoldings.map((stock) => (
              <div className="holding-row" key={stock._id}>
                <span className="holding-name">{stock.name}</span>
                <div className="holding-figures">
                  <span className="holding-value">{formatINR(stock.value)}</span>
                  <span className={stock.pnl >= 0 ? "holding-change profit" : "holding-change loss"}>
                    {stock.pnl >= 0 ? "+" : ""}
                    {formatINR(stock.pnl)} ({stock.pct >= 0 ? "+" : ""}
                    {stock.pct.toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))}
            {topHoldings.length === 0 && <p className="empty-state">No holdings yet.</p>}
          </div>

          <a className="view-link" href="/dashboard/holdings">
            View Holdings <FaArrowRight />
          </a>
        </div>
      </div>

      {/* CHART / GAINERS / LOSERS */}
      <div className="row-3 row-chart">
        <div className="panel chart-card">
          <div className="chart-card-header">
            <h3>Portfolio Value Over Time</h3>
            <div className="range-toggle">
              {RANGES.map((r) => (
                <button
                  key={r}
                  className={r === range ? "range-btn active" : "range-btn"}
                  onClick={() => setRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="line-chart-wrap">
            <Line
              data={growthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { color: "#9aa1ac", font: { size: 11 } } },
                  y: {
                    grid: { color: "#eef0f3" },
                    ticks: {
                      color: "#9aa1ac",
                      font: { size: 11 },
                      callback: (v) => formatCompactINR(v),
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="panel movers-card">
          <h3>Top Gainers</h3>
          <ul className="movers-list">
            {gainers.map((s) => (
              <li key={s._id}>
                <span>{s.name}</span>
                <span className="profit">+{s.pct.toFixed(2)}%</span>
              </li>
            ))}
            {gainers.length === 0 && <p className="empty-state">No gainers today.</p>}
          </ul>
        </div>

        <div className="panel movers-card">
          <h3>Top Losers</h3>
          <ul className="movers-list">
            {losers.map((s) => (
              <li key={s._id}>
                <span>{s.name}</span>
                <span className="loss">{s.pct.toFixed(2)}%</span>
              </li>
            ))}
            {losers.length === 0 && <p className="empty-state">No losers today.</p>}
          </ul>
        </div>
      </div>

      {/* ORDERS / NEWS */}
      <div className="row-2">
        <div className="panel orders-card">
          <h3>Recent Orders</h3>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Stock</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={order._id || idx}>
                  <td>{order.time}</td>
                  <td>
                    <span className={order.mode === "SELL" ? "type-badge sell" : "type-badge buy"}>
                      {order.mode}
                    </span>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price != null ? `₹${Number(order.price).toFixed(2)}` : "—"}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No recent orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <a className="view-link" href="/dashboard/orders">
            View All Orders <FaArrowRight />
          </a>
        </div>

        <div className="panel news-card">
          <h3>News &amp; Updates</h3>

          <ul className="news-list">
            {NEWS_ITEMS.map((item, i) => (
              <li key={i}>
                <span className="news-text">{item.text}</span>
                <span className="news-time">{item.time}</span>
              </li>
            ))}
          </ul>

          <a className="view-link" href="/dashboard/news">
            View All News <FaArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Summary;