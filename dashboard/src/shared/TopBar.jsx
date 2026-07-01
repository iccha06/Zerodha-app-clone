import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="topbar-container">
      {/* Market Indices - Only for Users */}
      {role !== "admin" && (
        <div className="indices-container">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>

          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>
        </div>
      )}

      {/* Shared Menu */}
      <Menu type={role} />
    </div>
  );
};

export default TopBar;
