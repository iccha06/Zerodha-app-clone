import React from "react";

// Maps account/KYC status to the CSS class that colors its pill badge
const statusClassMap = {
  Active: "status-executed",
  Inactive: "status-cancelled",
  Verified: "status-executed",
  Pending: "status-pending",
};

const RecentUsers = ({ users = [], onViewAll }) => {
  const recentUsers = users.slice(0, 5);

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3>Recent Users</h3>

        <button
          type="button"
          className="view-all-btn"
          onClick={onViewAll}
        >
          View All Users
        </button>
      </div>

      <div className="admin-card-table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined On</th>
              <th>KYC Status</th>
            </tr>
          </thead>

          <tbody>
            {recentUsers.map((user) => {
              // If backend already sends status, use it.
              // Otherwise calculate it from lastSeen.
              const status = user.status || "Inactive";

              return (
                <tr key={user._id}>
                  <td>{user.username}</td>

                  <td className="cell-muted">{user.email}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        statusClassMap[status]
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="cell-muted">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <span className="status-badge status-pending">
                      Pending
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;

