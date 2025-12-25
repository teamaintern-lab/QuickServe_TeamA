import React from "react";
import "../styles/Dashboard.css";

export default function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <h3 className="user-name">{user?.username}</h3>
            <p className="user-email">{user?.email}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
