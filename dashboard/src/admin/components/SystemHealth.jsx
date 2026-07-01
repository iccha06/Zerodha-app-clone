import React from "react";

const SystemHealth = ({ health }) => {
  return (
    <div className="admin-card">
      <h3>System Health</h3>

      <div className="health-row">
        <span>Server Uptime</span>

        <strong>
          {Math.floor(health.uptime || 0)} sec
        </strong>
      </div>

      <div className="health-row">
        <span>Memory Usage</span>

        <strong>
          {(health.memoryUsage || 0).toFixed(2)} MB
        </strong>
      </div>

      <div className="health-row">
        <span>CPU Load</span>

        <strong>
          {(health.cpuLoad || 0).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default SystemHealth;