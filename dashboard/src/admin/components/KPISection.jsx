import React from "react";
import {
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaBoxes,
  FaExchangeAlt,
  FaWallet,
} from "react-icons/fa";
import "./KPI.css";
const calculateChange = (current, previous) => {
  if (!previous || previous === 0) {
    return {
      text: "No previous data",
      trend: "neutral",
    };
  }

  const percentage =
    ((current - previous) / previous) * 100;

  if (percentage === 0) {
    return {
      text: "0.0%",
      trend: "neutral",
    };
  }

  return {
    text: `${Math.abs(percentage).toFixed(1)}%`,
    trend: percentage > 0 ? "up" : "down",
  };
};
const KPISection = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      previous: stats.prevUsers,
      icon: <FaUsers />,
      tone: "tone-blue",
      label: "from last week",
    },
    {
      title: "Total Holdings",
      value: stats.holdings,
      previous: stats.prevHoldings,
      icon: <FaBoxes />,
      tone: "tone-green",
      label: "from last week",
    },
    {
      title: "Today's Orders",
      value: stats.orders,
      previous: stats.prevOrders,
      icon: <FaClipboardList />,
      tone: "tone-orange",
      label: "from yesterday",
    },
    {
      title: "Listed Stocks",
      value: stats.stocks,
      previous: stats.prevStocks,
      icon: <FaChartLine />,
      tone: "tone-purple",
      label: "this month",
    },
    {
      title: "Trading Volume",
      value: stats.totalVolume,
      previous: stats.prevTotalVolume,
      icon: <FaExchangeAlt />,
      tone: "tone-cyan",
      label: "from last week",
    },
    {
      title: "Stock Manager",
      value: "Manage",
      icon: <FaWallet />,
      tone: "tone-red",
      action: true,
    },
  ];
  return (
    <div className="kpi-grid">
      {cards.map((card) => {
        const change = !card.action
          ? calculateChange(card.value, card.previous)
          : null;

        return (
          <div className="kpi-card" key={card.title}>
            <div className={`kpi-icon ${card.tone}`}>
              {card.icon}
            </div>

            <div className="kpi-body">
              <p className="kpi-label">{card.title}</p>

              {card.action ? (
                <h2>
                  <a
                    href="/dashboard/stocks"
                    style={{
                      textDecoration: "none",
                      color: "#387ed1",
                    }}
                  >
                    Manage
                  </a>
                </h2>
              ) : (
                <h2>{card.value}</h2>
              )}

              <span
                className={`kpi-change ${change ? change.trend : ""
                  }`}
              >
                {card.action ? (
                  "Open stock panel"
                ) : change.trend === "neutral" ? (
                  "No previous data"
                ) : (
                  `${change.trend === "up" ? "↑" : "↓"} ${change.text} ${card.label}`
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPISection;

