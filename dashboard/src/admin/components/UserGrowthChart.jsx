import React from "react";
import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const UserGrowthChart = ({ growthData }) => {
  const data = {
    labels: growthData.map((item) => item._id),

    datasets: [
      {
        label: "Users Registered",
        data: growthData.map((item) => item.users),

        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.1)",

        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="admin-card chart-card">
      <h3>User Growth</h3>

      <Line data={data} />
    </div>
  );
};

export default UserGrowthChart;