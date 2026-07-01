import React from "react";
import "./MarketOverview.css";

const MarketOverview = ({
  topGainer,
  topLoser,
  mostTraded,
  health,
}) => {
  return (
    <div className="market-overview">

      {/* Top Gainer */}
      <div className="market-card">
        <div className="market-header">
          <h4>Top Gainers</h4>
          <button>View All</button>
        </div>

        <div className="market-content">
          <div>
            <h5>{topGainer?.symbol || "--"}</h5>
          </div>

          <div className="market-right">
            <span>₹{topGainer?.price || "--"}</span>

            <span className="green">
              ▲ {topGainer?.change || "0.00"}%
            </span>
          </div>
        </div>
      </div>

      {/* Top Loser */}
      <div className="market-card">
        <div className="market-header">
          <h4>Top Losers</h4>
          <button>View All</button>
        </div>

        <div className="market-content">
          <div>
            <h5>{topLoser?.symbol || "--"}</h5>
          </div>

          <div className="market-right">
            <span>₹{topLoser?.price || "--"}</span>

            <span className="red">
              ▼ {topLoser?.change || "0.00"}%
            </span>
          </div>
        </div>
      </div>

      {/* Most Traded */}
      <div className="market-card">
        <div className="market-header">
          <h4>Most Traded</h4>
          <button>View All</button>
        </div>

        <div className="market-content">
          <div>
            <h5>{mostTraded?.symbol || "--"}</h5>
          </div>

          <div className="market-right">
            <span>₹{mostTraded?.price || "--"}</span>

            <span>{mostTraded?.volume || "--"}</span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="market-card">
        <div className="market-header">
          <h4>System Health</h4>
          <button>View All</button>
        </div>

        <div className="system-status">

          <div className="status-circle">
            ✓
          </div>

          <span>
            {health.status || "All Systems Operational"}
          </span>

        </div>
      </div>

    </div>
  );
};

export default MarketOverview;