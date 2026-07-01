import React from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BuySellChart = ({ buyOrders, sellOrders }) => {
  const data = {
    labels: ["Buy", "Sell"],

    datasets: [
      {
        data: [buyOrders, sellOrders],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className="admin-card chart-card">
      <div className="admin-card-header">
        <h3>Buy vs Sell Orders</h3>
        <select className="admin-card-filter" defaultValue="today">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="chart-canvas-wrap">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default BuySellChart;