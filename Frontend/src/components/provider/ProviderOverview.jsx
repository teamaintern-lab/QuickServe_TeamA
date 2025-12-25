export default function ProviderOverview({ stats, requests, user }) {
  return (
    <>
      <h1 className="page-title">Dashboard Overview</h1>

      {/* TOP STATS */}
      <div className="stats-grid">
        <Stat label="Total Earnings" value={`₹${stats.totalEarnings}`} icon="💰" />
        <Stat label="Upcoming Bookings" value={stats.upcoming} icon="📅" />
        <Stat label="Pending Requests" value={stats.pending} icon="⏳" />
        <Stat label="Service Rating" value={stats.rating} icon="⭐" highlight />
      </div>

      {/* LOWER SECTION */}
      <div className="lower-grid">

        {/* RECENT REQUESTS */}
        <div className="card">
          <h3>Recent Requests</h3>
          {requests.length === 0 ? (
            <p>No requests yet</p>
          ) : (
            requests.slice(0, 3).map(r => (
              <div key={r.id}>{r.serviceType}</div>
            ))
          )}
        </div>

        {/* QUICK STATS */}
        <div className="card">
          <h3>Quick Stats</h3>

          <div className="quick-stat">
            <span>Service Category</span>
            <strong>{user.customService || user.category}</strong>
          </div>

          <div className="quick-stat">
            <span>Completed Services</span>
            <strong>{stats.upcoming}</strong>
          </div>

          <div className="quick-stat">
            <span>Response Rate</span>
            <strong>100%</strong>
          </div>

          <div className="quick-stat">
            <span>Customer Rating</span>
            ⭐⭐⭐⭐⭐
          </div>
        </div>

        {/* ✅ EARNINGS (NEW) */}
        <div className="card">
          <h3>Earnings</h3>

          <div className="quick-stat">
            <span>Total Earnings</span>
            <strong>₹{stats.totalEarnings}</strong>
          </div>

          <div className="quick-stat">
            <span>Pending Amount</span>
            <strong>₹0</strong>
          </div>

          <div className="quick-stat">
            <span>Average / Job</span>
            <strong>₹0</strong>
          </div>

          <div className="quick-stat">
            <span>Completed Jobs</span>
            <strong>{stats.upcoming}</strong>
          </div>
        </div>

      </div>
    </>
  );
}

/* SMALL COMPONENT */
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
