import { useEffect, useState } from "react";
import ProviderOverview from "./provider/ProviderOverview";
import ProviderRequests from "./provider/ProviderRequests";
import ProviderEarnings from "./provider/ProviderEarnings";
import ProviderCalendar from "./provider/ProviderCalendar";
import ProviderCompleted from "./provider/ProviderCompleted";
import ProviderProfile from "./provider/ProviderProfile";
import {
  getProviderRequests,
  getProviderEarnings,
  getProviderCompleted,
  acceptRequest,
  declineRequest,
  completeRequest,
  updateProviderProfile,
} from "../services/api";

import "../styles/dashboard.common.css";
import "../styles/provider-dashboard.css";
export default function ProviderDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [earnings, setEarnings] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [editData, setEditData] = useState({
  fullName: user.fullName,
  email: user.email,
  category: user.category,
  customService: user.customService,
  experience: user.experience || "",
  phone: user.phone || ""
});


  const [stats, setStats] = useState({
    totalEarnings: 0,
    upcoming: 0,
    pending: 0,
    rating: 4.8,
  });
  const [requests, setRequests] = useState([]);

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    loadOverview();
  }, []);
  useEffect(() => {
  if (activeTab === "earnings") {
    getProviderEarnings().then(res => setEarnings(res.data));
  }
}, [activeTab]);
useEffect(() => {
  if (activeTab === "completed") {
    getProviderCompleted().then(res => setCompleted(res.data));
  }
}, [activeTab]);


const handleUserUpdate = async () => {
  try {
    const res = await updateProviderProfile(editData);

    // Update UI immediately
    Object.assign(user, res.data);

    setIsEditing(false);
    alert("Profile updated successfully");

  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};
const getCalendarEvents = () => {
  return requests
    .filter(
      r =>
        r.bookingDateTime &&
        (r.status === "ACCEPTED" || r.status === "COMPLETED")
    )
    .map(r => {
      const [date, time] = r.bookingDateTime.split(" ");
      return {
        id: r.id,
        date,
        time,
        service: r.serviceType,
        amount: r.amount,
        status: r.status,
      };
    });
};


  const loadOverview = async () => {
    const res = await getProviderRequests();
    const data = res.data || [];

    const completed = data.filter(r => r.status === "COMPLETED");
    const accepted = data.filter(r => r.status === "ACCEPTED");
    const pending = data.filter(r => r.status === "REQUESTED");
    const totalEarnings = completed.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    );

    setStats({
      totalEarnings,
      upcoming: accepted.length,
      pending: pending.length,
      rating: 4.8,
    });

    setRequests(data);
  };


  /* ---------------- UI ---------------- */

  return (
    <div className="dashboard-wrapper">

      {/* ===== TOP HEADER ===== */}
      {/* ===== TOP DASHBOARD HEADER ===== */}
<header className="provider-header">

  {/* LEFT: PROVIDER INFO */}
  <div className="provider-header-left">
  <div className="provider-avatar">🏢</div>

  <div className="provider-text">
    {/* NAME */}
    <div className="provider-name">
      {user.fullName}
    </div>

    {/* ROLE */}
    <div className="provider-role">
      Service Provider
    </div>

    {/* EMAIL */}
    <div className="provider-email">
      {user.email}
    </div>

    {/* SERVICE CATEGORY */}
    <div className="provider-service">
      {user.customService || user.category}
    </div>
  </div>
</div>



  {/* CENTER: TABS */}
  <nav className="provider-header-tabs">
    {[
      ["overview", "Overview"],
      ["requests", "Service Requests"],
      ["earnings", "Earnings"],
      ["calendar", "Calendar"],
      ["completed", "Completed Services"],
      ["profile", "Profile & Settings"],
    ].map(([key, label]) => (
      <button
        key={key}
        className={`tab-btn ${activeTab === key ? "active" : ""}`}
        onClick={() => setActiveTab(key)}
      >
        {label}
      </button>
    ))}
  </nav>

  {/* RIGHT: LOGOUT */}
  <button className="logout-btn" onClick={onLogout}>
    Logout
  </button>

</header>


      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">


        {/* ===== STATS ===== */}
        {/* ===== OVERVIEW TAB ===== */}
{/* ================= TAB CONTENT ================= */}

{activeTab === "overview" && (
  <ProviderOverview
    stats={stats}
    requests={requests}
    user={user}
  />
)}
{/* ================= EARNINGS (OVERVIEW) ================= */}
{activeTab === "overview" && earnings && (
  <div className="dashboard-card">
    <h3 className="card-title">Earnings</h3>

    <div className="earnings-grid">
      <div className="earn-item">
        <span className="earn-label">Total Earnings</span>
        <strong className="earn-value">₹{earnings.total}</strong>
      </div>

      <div className="earn-item">
        <span className="earn-label">Pending Amount</span>
        <strong className="earn-value">₹{earnings.pending}</strong>
      </div>

      <div className="earn-item">
        <span className="earn-label">Average / Job</span>
        <strong className="earn-value">₹{earnings.avg}</strong>
      </div>

      <div className="earn-item">
        <span className="earn-label">Completed Jobs</span>
        <strong className="earn-value">
          {earnings.completedCount}
        </strong>
      </div>
    </div>
  </div>
)}

{activeTab === "requests" && (
  <ProviderRequests
    requests={requests}
    onRefresh={loadOverview}
  />
)}

{activeTab === "earnings" && (
  <ProviderEarnings earnings={earnings} />
)}


{/* ================= CALENDAR TAB ================= */}
{activeTab === "calendar" && (
  <ProviderCalendar requests={requests} />
)}


{activeTab === "completed" && (
  <ProviderCompleted completed={completed} />
)}
{activeTab === "profile" && (
  <ProviderProfile
    user={user}
    onUserUpdate={(updatedUser) => Object.assign(user, updatedUser)}
  />
)}
      </main>
    </div>
  );
}

/* ===== SMALL COMPONENT ===== */

function Stat({ label, value, icon, highlight }) {
  return (
    <div className={`stat-card ${highlight ? "highlight" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
function ProfileRow({
  label,
  value,
  editable = false,
  readOnly = false,
  type = "text",
  onChange
}) {
  return (
    <div className="profile-row">
      <span className="profile-label">{label}</span>

      {!editable || readOnly ? (
        <span className="profile-value">{value}</span>
      ) : (
        <input
          type={type}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
