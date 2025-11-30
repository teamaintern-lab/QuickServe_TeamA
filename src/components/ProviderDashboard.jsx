import { useState } from 'react';
import '../styles/Dashboard.css';

export default function ProviderDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('requests');
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 'REQ-1001',
      customerName: 'Aditi Varma',
      serviceType: 'Electrical Repair',
      location: 'Koramangala, BLR',
      date: '2025-12-05',
      time: '10:00 AM',
      urgency: 'high',
      amount: 780,
      status: 'pending',
      description: 'Power outage in kitchen',
    },
    {
      id: 'REQ-1002',
      customerName: 'Rahul Sen',
      serviceType: 'Electrical Repair',
      location: 'Indiranagar, BLR',
      date: '2025-12-03',
      time: '02:00 PM',
      urgency: 'medium',
      amount: 650,
      status: 'accepted',
      description: 'Switch replacement',
    },
    {
      id: 'REQ-1003',
      customerName: 'Meera Nair',
      serviceType: 'Electrical Repair',
      location: 'HSR Layout, BLR',
      date: '2025-11-28',
      time: '11:00 AM',
      urgency: 'low',
      amount: 500,
      status: 'completed',
      description: 'Regular maintenance',
    },
  ]);

  const [earnings] = useState({
    today: 1200,
    thisWeek: 5600,
    thisMonth: 18500,
    total: 156700,
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#f5a623';
      case 'low':
        return '#7ed321';
      default:
        return '#999';
    }
  };

  const handleAcceptRequest = (id) => {
    setServiceRequests(
      serviceRequests.map((req) =>
        req.id === id ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleRejectRequest = (id) => {
    setServiceRequests(serviceRequests.filter((req) => req.id !== id));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar provider-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">🏢</div>
          <div className="user-info">
            <h3 className="user-name">{user.username}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-role">Service Provider</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="nav-icon">📬</span> Service Requests
          </button>
          <button
            className={`nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <span className="nav-icon">💵</span> Earnings
          </button>
          <button
            className={`nav-item ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span className="nav-icon">✅</span> Completed Services
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span> Profile & Settings
          </button>
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="page-title">
            {activeTab === 'requests' && 'Service Requests'}
            {activeTab === 'earnings' && 'Earnings'}
            {activeTab === 'completed' && 'Completed Services'}
            {activeTab === 'profile' && 'Profile & Settings'}
          </h1>
          {activeTab === 'earnings' && (
            <div className="header-stats">
              <div className="stat-card">
                <span className="stat-value">₹{earnings.today}</span>
                <span className="stat-label">Today</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">₹{earnings.thisWeek}</span>
                <span className="stat-label">This Week</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">₹{earnings.thisMonth}</span>
                <span className="stat-label">This Month</span>
              </div>
              <div className="stat-card highlight">
                <span className="stat-value">₹{earnings.total}</span>
                <span className="stat-label">Total Earned</span>
              </div>
            </div>
          )}
        </div>

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div className="tab-content">
            <div className="filter-buttons">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Pending</button>
              <button className="filter-btn">Accepted</button>
            </div>
            <div className="requests-list">
              {serviceRequests.map((req) => (
                <div key={req.id} className="request-card">
                  <div className="request-header">
                    <div className="request-title">
                      <h3>{req.serviceType}</h3>
                      <p className="customer-name">From: {req.customerName}</p>
                    </div>
                    <span
                      className="urgency-badge"
                      style={{ backgroundColor: getUrgencyColor(req.urgency) }}
                    >
                      {req.urgency.toUpperCase()}
                    </span>
                  </div>

                  <div className="request-details">
                    <p className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{req.location}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{req.date} at {req.time}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">💰</span>
                      <span>₹{req.amount}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-icon">📝</span>
                      <span>{req.description}</span>
                    </p>
                  </div>

                  <div className="request-status">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          req.status === 'pending'
                            ? '#f5a623'
                            : req.status === 'accepted'
                            ? '#7ed321'
                            : '#4a90e2',
                      }}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  {req.status === 'pending' && (
                    <div className="request-actions">
                      <button
                        className="action-btn primary"
                        onClick={() => handleAcceptRequest(req.id)}
                      >
                        Accept Request
                      </button>
                      <button
                        className="action-btn danger"
                        onClick={() => handleRejectRequest(req.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="tab-content">
            <div className="earnings-content">
              <div className="earnings-chart">
                <h3>Earnings Chart</h3>
                <div className="chart-placeholder">
                  📊 Earnings visualization would go here
                </div>
              </div>
              <div className="earnings-breakdown">
                <h3>Top Services</h3>
                <div className="service-item">
                  <span>Electrical Repair</span>
                  <span className="earnings">₹45,600</span>
                </div>
                <div className="service-item">
                  <span>Maintenance</span>
                  <span className="earnings">₹32,100</span>
                </div>
                <div className="service-item">
                  <span>Installation</span>
                  <span className="earnings">₹25,400</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Services Tab */}
        {activeTab === 'completed' && (
          <div className="tab-content">
            <div className="completed-list">
              {serviceRequests
                .filter((req) => req.status === 'completed')
                .map((service) => (
                  <div key={service.id} className="completed-item">
                    <div className="completed-info">
                      <h3>{service.serviceType}</h3>
                      <p>{service.customerName} - {service.location}</p>
                      <p className="completed-date">{service.date}</p>
                    </div>
                    <div className="completed-amount">
                      <span>₹{service.amount}</span>
                      <p className="text-small">Completed</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="profile-section">
              <h2>Professional Information</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" defaultValue={user.username} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>Service Category</label>
                  <input type="text" defaultValue="Electrical Services" />
                </div>
                <div className="form-group">
                  <label>Availability</label>
                  <select>
                    <option>Available</option>
                    <option>Busy</option>
                    <option>On Holiday</option>
                  </select>
                </div>
                <button className="action-btn primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
