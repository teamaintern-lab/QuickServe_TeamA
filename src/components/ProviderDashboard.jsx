import { useState, useEffect } from 'react';
import requestsData from '../data/requests.json';
import '../styles/Dashboard.css';

export default function ProviderDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [serviceRequests, setServiceRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState(null);

  // Map service category from user to filter requests
  const categoryMap = {
    'electrical': 'electrical',
    'plumbing': 'plumbing',
    'cleaning': 'cleaning',
    'carpentry': 'carpentry',
    'painting': 'painting',
    'ac-maintenance': 'ac-maintenance',
    'appliance-repair': 'appliance-repair',
    'pest-control': 'pest-control',
    'landscaping': 'landscaping',
    'other': 'other'
  };

  // Initialize requests - filter by provider's service category
  useEffect(() => {
    const providerCategory = categoryMap[user.category] || user.category;
    const filteredRequests = requestsData.requests.filter(
      req => req.serviceType === providerCategory
    );
    setServiceRequests(filteredRequests);
  }, [user.category]);

  // Calculate statistics
  const stats = {
    pending: serviceRequests.filter(r => r.status === 'pending').length,
    accepted: serviceRequests.filter(r => r.status === 'accepted').length,
    declined: serviceRequests.filter(r => r.status === 'declined').length,
    completed: serviceRequests.filter(r => r.status === 'completed').length,
    totalEarnings: serviceRequests
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.amount, 0),
  };

  // Filter requests based on status
  const filteredRequests = filterStatus === 'all'
    ? serviceRequests
    : serviceRequests.filter(req => req.status === filterStatus);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAcceptRequest = (id) => {
    setServiceRequests(
      serviceRequests.map((req) =>
        req.id === id ? { ...req, status: 'accepted' } : req
      )
    );
    showNotification('Request accepted successfully!', 'success');
  };

  const handleDeclineRequest = (id) => {
    setServiceRequests(
      serviceRequests.map((req) =>
        req.id === id ? { ...req, status: 'declined' } : req
      )
    );
    showNotification('Request declined', 'info');
  };

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

  const getCategoryLabel = (category) => {
    const labels = {
      'electrical': 'Electrical Services',
      'plumbing': 'Plumbing Services',
      'cleaning': 'Cleaning Services',
      'carpentry': 'Carpentry Services',
      'painting': 'Painting Services',
      'ac-maintenance': 'AC Maintenance & Repair',
      'appliance-repair': 'Appliance Repair',
      'pest-control': 'Pest Control',
      'landscaping': 'Landscaping & Gardening',
      'other': user.customService || 'Other Services'
    };
    return labels[category] || category;
  };

  return (
    <div className="dashboard-container">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' && '✓'} {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="dashboard-sidebar provider-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">🏢</div>
          <div className="user-info">
            <h3 className="user-name">{user.username}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-role">Service Provider</p>
            <p className="user-category">{getCategoryLabel(user.category)}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span> Overview
          </button>
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
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'requests' && 'Service Requests'}
            {activeTab === 'earnings' && 'Earnings'}
            {activeTab === 'completed' && 'Completed Services'}
            {activeTab === 'profile' && 'Profile & Settings'}
          </h1>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-content">
            <div className="stats-grid">
              <div className="stat-card-large">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.pending}</span>
                  <span className="stat-label">Pending Requests</span>
                </div>
              </div>
              <div className="stat-card-large">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.accepted}</span>
                  <span className="stat-label">Accepted Requests</span>
                </div>
              </div>
              <div className="stat-card-large">
                <div className="stat-icon">❌</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.declined}</span>
                  <span className="stat-label">Declined Requests</span>
                </div>
              </div>
              <div className="stat-card-large highlight">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-value">₹{stats.totalEarnings.toLocaleString()}</span>
                  <span className="stat-label">Total Earnings</span>
                </div>
              </div>
            </div>

            <div className="overview-sections">
              <div className="overview-section">
                <h2 className="section-title">Recent Requests</h2>
                <div className="requests-preview">
                  {serviceRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="request-preview-item">
                      <div className="preview-header">
                        <h4>{req.serviceLabel}</h4>
                        <span
                          className="urgency-badge"
                          style={{ backgroundColor: getUrgencyColor(req.urgency) }}
                        >
                          {req.urgency.toUpperCase()}
                        </span>
                      </div>
                      <p className="preview-customer">{req.customerName}</p>
                      <p className="preview-location">📍 {req.location}</p>
                      <p className="preview-amount">₹{req.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-section">
                <h2 className="section-title">Quick Stats</h2>
                <div className="quick-stats">
                  <div className="quick-stat-item">
                    <span className="quick-stat-label">Service Category</span>
                    <span className="quick-stat-value">{getCategoryLabel(user.category)}</span>
                  </div>
                  <div className="quick-stat-item">
                    <span className="quick-stat-label">Completed Services</span>
                    <span className="quick-stat-value">{stats.completed}</span>
                  </div>
                  <div className="quick-stat-item">
                    <span className="quick-stat-label">Response Rate</span>
                    <span className="quick-stat-value">100%</span>
                  </div>
                  <div className="quick-stat-item">
                    <span className="quick-stat-label">Customer Rating</span>
                    <span className="quick-stat-value">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div className="tab-content">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All ({serviceRequests.length})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending ({stats.pending})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'accepted' ? 'active' : ''}`}
                onClick={() => setFilterStatus('accepted')}
              >
                Accepted ({stats.accepted})
              </button>
              <button
                className={`filter-btn ${filterStatus === 'declined' ? 'active' : ''}`}
                onClick={() => setFilterStatus('declined')}
              >
                Declined ({stats.declined})
              </button>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="empty-state">
                <p>No requests found</p>
              </div>
            ) : (
              <div className="requests-list">
                {filteredRequests.map((req) => (
                  <div key={req.id} className="request-card">
                    <div className="request-header">
                      <div className="request-title">
                        <h3>{req.serviceLabel}</h3>
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
                        <span>₹{req.amount} (₹ {(req.amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })})</span>
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
                              : '#999',
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
                          ✓ Accept Request
                        </button>
                        <button
                          className="action-btn danger"
                          onClick={() => handleDeclineRequest(req.id)}
                        >
                          ✕ Decline
                        </button>
                      </div>
                    )}
                    {req.status === 'accepted' && (
                      <div className="request-actions">
                        <button className="action-btn success" disabled>
                          ✓ Accepted
                        </button>
                        <button
                          className="action-btn danger"
                          onClick={() => handleDeclineRequest(req.id)}
                        >
                          Undo Acceptance
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="tab-content">
            <div className="earnings-container">
              <div className="earnings-stats">
                <div className="earnings-card">
                  <h3>Today's Earnings</h3>
                  <p className="earnings-amount">₹{serviceRequests.filter(r => r.status === 'completed' && r.date === new Date().toISOString().split('T')[0]).reduce((sum, r) => sum + r.amount, 0) || 0}</p>
                </div>
                <div className="earnings-card">
                  <h3>This Week</h3>
                  <p className="earnings-amount">₹{Math.floor(stats.totalEarnings / 4)}</p>
                </div>
                <div className="earnings-card">
                  <h3>This Month</h3>
                  <p className="earnings-amount">₹{stats.totalEarnings}</p>
                </div>
                <div className="earnings-card highlight">
                  <h3>Total Earnings</h3>
                  <p className="earnings-amount">₹{stats.totalEarnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="earnings-breakdown">
                <h2 className="section-title">Earnings Breakdown</h2>
                <div className="breakdown-content">
                  <p>Based on completed services: {stats.completed}</p>
                  <p className="average-earning">
                    Average per service: ₹{stats.completed > 0 ? Math.round(stats.totalEarnings / stats.completed) : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Services Tab */}
        {activeTab === 'completed' && (
          <div className="tab-content">
            {serviceRequests.filter(r => r.status === 'completed').length === 0 ? (
              <div className="empty-state">
                <p>No completed services yet</p>
              </div>
            ) : (
              <div className="completed-list">
                {serviceRequests
                  .filter((req) => req.status === 'completed')
                  .map((service) => (
                    <div key={service.id} className="completed-item">
                      <div className="completed-info">
                        <h3>{service.serviceLabel}</h3>
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
            )}
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
                  <input type="text" defaultValue={getCategoryLabel(user.category)} disabled />
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
