import React from 'react';
import '../styles/Dashboard.css';

export default function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="dashboard-container">
      {children}
    </div>
  );
}
