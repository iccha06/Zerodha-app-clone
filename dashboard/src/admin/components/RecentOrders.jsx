import React from "react";

// Maps order status to the CSS class that colors its pill badge
const statusClassMap = {
  Executed: "status-executed",
  Pending: "status-pending",
  Cancelled: "status-cancelled",
};

const RecentOrders = ({ orders = [], onViewAll }) => {
  // Only show the 5 most recent orders on the dashboard
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Recent Orders</h3>
        <button type="button" className="view-all-btn" onClick={onViewAll}>
          View All Orders
        </button>
      </div>

      <div className="admin-card-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Id</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              {/* <th>Status</th> */}
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td className="cell-muted">{order._id.slice(-6)}</td>
                <td>{order.userId}</td>
                <td>{order.name}</td>
                <td>
                  <span
                    className={order.mode === "BUY" ? "buy" : "sell"}
                  >
                    {order.mode}
                  </span>
                </td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                {/* <td>
                  <span
                    className={`status-badge ${
                      statusClassMap[order.status] || ""
                    }`}
                  >
                    {order.status}
                  </span>
                </td> */}
                <td className="cell-muted">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
