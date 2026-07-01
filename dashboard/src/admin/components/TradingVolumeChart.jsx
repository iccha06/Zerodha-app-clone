import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BAR_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ec4899"];

const TradingVolumeChart = ({ volumeData }) => {
  const data = {
    labels: volumeData.map((item) => item._id),

    datasets: [
      {
        label: "Trading Volume",
        data: volumeData.map((item) => item.totalQty),
        backgroundColor: volumeData.map(
          (_, i) => BAR_COLORS[i % BAR_COLORS.length]
        ),
        borderRadius: 6,
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          callback: (value) => (value >= 1000 ? `${value / 1000}K` : value),
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="admin-card chart-card">
      <div className="admin-card-header">
        <h3>Trading Volume</h3>
        <select className="admin-card-filter" defaultValue="week">
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="chart-canvas-wrap">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TradingVolumeChart;
