import { useEffect, useRef, useState } from "react";
import {
  getProviderCompleted,
  getProviderEarnings,
  getProviderRequests,
} from "../services/api";
import Chat from "./Chat";
import ProviderCalendar from "./provider/ProviderCalendar";
import ProviderCompleted from "./provider/ProviderCompleted";
import ProviderEarnings from "./provider/ProviderEarnings";
import ProviderOverview from "./provider/ProviderOverview";
import ProviderProfile from "./provider/ProviderProfile";
<<<<<<< HEAD
import ProviderRequests from "./provider/ProviderRequests";
=======
import Chat from "./Chat";
import {
  getProviderRequests,
  getProviderEarnings,
  getProviderCompleted,
} from "../services/api";
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

import MapComponent from "../components/Map/MapComponent";
import "../styles/dashboard.common.css";
import "../styles/provider-dashboard.css";
<<<<<<< HEAD
=======
import MapComponent from "../components/Map/MapComponent";
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

export default function ProviderDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [earnings, setEarnings] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [requests, setRequests] = useState([]);
const [selectedRequest, setSelectedRequest] = useState(null);
const [chatBooking, setChatBooking] = useState(null);
const [showChat, setShowChat] = useState(false);
// 🔴 FIXED PROVIDER LOCATION (constant)
<<<<<<< HEAD

=======
const PROVIDER_LOCATION = {
  latitude: 13.6833,
  longitude: 79.3476
};
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

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
<<<<<<< HEAD
=======
    loadOverview();
    // Load earnings once so overview can use it
    getProviderEarnings().then(res => setEarnings(res.data));
  }, []);

  useEffect(() => {
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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
<<<<<<< HEAD
    const timer = setTimeout(() => setSelectedRequest(null), 0);
    return () => clearTimeout(timer);
  }
}, [activeTab]);


=======
    setSelectedRequest(null);
  }
}, [activeTab]);

>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
useEffect(() => {
  if (selectedRequest) {
    console.log(
      "MAP PROPS",
      user.latitude,
      user.longitude,
      selectedRequest.customerLatitude,
      selectedRequest.customerLongitude
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
      (sum, r) => sum + (r.amount || 0),
=======
      (sum, r) => sum + (r.finalAmount || r.amount || 0),
>>>>>>> 7e6c529 (final updated code)
      0
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
    );
  }
}, [selectedRequest, user.latitude, user.longitude]);

  const openChat = (booking) => {
    setChatBooking(booking);
    setShowChat(true);
  };

<<<<<<< HEAD
  const closeChat = () => {
    setShowChat(false);
    setChatBooking(null);
  };

  const hasLoaded = useRef(false);

const fetchOverview = async () => {
    try {
      const res = await getProviderRequests();
      const rawData = res.data || [];

      const data = Array.from(
      new Map(rawData.map(item => [item.id, item])).values()
    );

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
    } catch (err) {
      console.error("Failed to load overview:", err);
    }
  };

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {

    if (hasLoaded.current) return;
    hasLoaded.current = true;
    fetchOverview();

    getProviderEarnings()
      .then(res => setEarnings(res.data))
      .catch(err => console.error("Failed to load earnings:", err));
  }, []);

    
    

  /* ---------------- MAP DATA ---------------- */

  // const customerLocations = requests
  //   .filter(r => r.customerLatitude && r.customerLongitude)
  //   .map(r => ({
  //     id: r.id,
  //     name: "Customer",
  //     latitude: r.customerLatitude,
  //     longitude: r.customerLongitude,
  //   }));
=======
  /* ---------------- MAP DATA ---------------- */

  const customerLocations = requests
    .filter(r => r.customerLatitude && r.customerLongitude)
    .map(r => ({
      id: r.id,
      name: "Customer",
      latitude: r.customerLatitude,
      longitude: r.customerLongitude,
    }));
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

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
<<<<<<< HEAD
              onRefresh={fetchOverview}
=======
              onRefresh={loadOverview}
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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
