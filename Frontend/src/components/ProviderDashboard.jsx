import { useEffect, useState } from "react";
import ProviderOverview from "./provider/ProviderOverview";
import ProviderRequests from "./provider/ProviderRequests";
import ProviderEarnings from "./provider/ProviderEarnings";
import ProviderCalendar from "./provider/ProviderCalendar";
import ProviderCompleted from "./provider/ProviderCompleted";
import ProviderProfile from "./provider/ProviderProfile";
import Chat from "./Chat";
import {
  getProviderRequests,
  getProviderEarnings,
  getProviderCompleted,
} from "../services/api";

import "../styles/dashboard.common.css";
import "../styles/provider-dashboard.css";
import MapComponent from "../components/Map/MapComponent";

export default function ProviderDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [earnings, setEarnings] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [requests, setRequests] = useState([]);
const [selectedRequest, setSelectedRequest] = useState(null);
const [chatBooking, setChatBooking] = useState(null);
const [showChat, setShowChat] = useState(false);
// 🔴 FIXED PROVIDER LOCATION (constant)
const PROVIDER_LOCATION = {
  latitude: 13.6833,
  longitude: 79.3476
};

  const [stats, setStats] = useState({
    totalEarnings: 0,
    upcoming: 0,
    pending: 0,
    rating: 4.8,
  });

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    loadOverview();
    // Load earnings once so overview can use it
    getProviderEarnings().then(res => setEarnings(res.data));
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
useEffect(() => {
  if (activeTab !== "requests") {
    setSelectedRequest(null);
  }
}, [activeTab]);

useEffect(() => {
  if (selectedRequest) {
    console.log(
      "MAP PROPS",
      user.latitude,
      user.longitude,
      selectedRequest.customerLatitude,
      selectedRequest.customerLongitude
    );
  }
}, [selectedRequest, user.latitude, user.longitude]);

  const openChat = (booking) => {
    setChatBooking(booking);
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setChatBooking(null);
  };

  const loadOverview = async () => {
    const res = await getProviderRequests();
    const data = res.data || [];

    const completedJobs = data.filter(r => r.status === "COMPLETED");
    const accepted = data.filter(r => r.status === "ACCEPTED");
    const pending = data.filter(r => r.status === "REQUESTED");

    const totalEarnings = completedJobs.reduce(
      (sum, r) => sum + (r.finalAmount || r.amount || 0),
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

  /* ---------------- MAP DATA ---------------- */

  const customerLocations = requests
    .filter(r => r.customerLatitude && r.customerLongitude)
    .map(r => ({
      id: r.id,
      name: "Customer",
      latitude: r.customerLatitude,
      longitude: r.customerLongitude,
    }));

  /* ---------------- UI ---------------- */

  return (
    <div className="dashboard-wrapper">

      {/* ===== HEADER ===== */}
      <header className="provider-header">

        <div className="provider-header-left">
          <div className="provider-avatar">🏢</div>
          <div className="provider-text">
            <div className="provider-name">{user.fullName}</div>
            <div className="provider-role">Service Provider</div>
            <div className="provider-email">{user.email}</div>
            <div className="provider-service">
              {user.customService || user.category}
            </div>
          </div>
        </div>

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

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">

        {activeTab === "overview" && (
          <ProviderOverview
            stats={stats}
            requests={requests}
            user={user}
          />
        )}

        {activeTab === "requests" && (
          <>
            <ProviderRequests
              requests={requests}
              onRefresh={loadOverview}
              onSelect={setSelectedRequest}
              onChat={openChat}
            />

            {selectedRequest &&
            selectedRequest.status === "ACCEPTED" &&
            selectedRequest.customerLatitude != null &&
            selectedRequest.customerLongitude != null && (


              <div className="dashboard-card">

                <MapComponent
                  route
                  locations={[
                    {
                      id: "provider",
                      name: "Provider",
                      latitude: PROVIDER_LOCATION.latitude,
                      longitude: PROVIDER_LOCATION.longitude
                    },
                    {
                      id: "customer",
                      name: "Customer",
                      latitude: selectedRequest.customerLatitude,
                      longitude: selectedRequest.customerLongitude
                    }
                  ]}
                  height="350px"
                />


              </div>
            )}

          </>
        )}

        {activeTab === "earnings" && (
          <ProviderEarnings earnings={earnings} />
        )}

        {activeTab === "calendar" && (
          <ProviderCalendar requests={requests} />
        )}

        {activeTab === "completed" && (
          <ProviderCompleted completed={completed} />
        )}

        {activeTab === "profile" && (
          <ProviderProfile
            user={user}
            onUserUpdate={() => {}}
          />
        )}

        {showChat && chatBooking && (
          <Chat
            bookingId={chatBooking.id}
            userId={user.userId}
            userName={user.fullName}
            booking={chatBooking}
            isOpen={showChat}
            onClose={closeChat}
          />
        )}
      </main>
    </div>
  );
}
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
