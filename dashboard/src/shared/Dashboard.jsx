import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "../components/Apps";
import Funds from "../user/Funds";
import Holdings from "../user/Holdings";
import Orders from "../user/Orders";
import Positions from "../user/Positions";
import Summary from "../user/Summary";
import AdminSummary from "../admin/AdminSummary";
import WatchList from "../user/WatchList";
import AdminStocks from "../admin/AdminStocks";
import { GeneralContextProvider } from "../components/GeneralContext";

const Dashboard = () => {
  const role = localStorage.getItem("role")|| "user";

  return (
    <div className="dashboard-container">

      {/* LEFT PANEL ONLY FOR USERS */}
      {role !== "admin" && (
        <GeneralContextProvider>
          <WatchList />
        </GeneralContextProvider>
      )}

      <div className={`content ${role === "admin" ? "admin-content" : ""}`}>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              role === "admin" ? <AdminSummary /> : <Summary />
            }
          />

          {role === "admin" ? (
            <>
              <Route path="stocks" element={<AdminStocks />} />
            </>
          ) : (
            <>
              <Route path="orders" element={<Orders />} />
              <Route path="holdings" element={<Holdings />} />
              <Route path="positions" element={<Positions />} />
              <Route path="funds" element={<Funds />} />
              <Route path="apps" element={<Apps />} />
            </>
          )}


        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
