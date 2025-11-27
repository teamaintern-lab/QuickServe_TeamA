import { useEffect, useMemo, useState } from 'react';
import '../styles/Dashboard.css';

const fallbackRequests = [
  {
    id: 'REQ-1024',
    customerName: 'Aditi Varma',
    serviceType: 'Electrical Repair',
    urgency: 'high',
    location: 'Koramangala, BLR',
    requestedAt: '2025-11-27T08:15:00Z',
    charge: 780,
    description: 'Power outage in kitchen and living room',
    status: 'pending',
  },
  {
    id: 'REQ-1025',
    customerName: 'Rahul Sen',
    serviceType: 'Deep Cleaning',
    urgency: 'medium',
    location: 'Indiranagar, BLR',
    requestedAt: '2025-11-27T07:45:00Z',
    charge: 1200,
    description: '2 BHK move-in cleaning',
    status: 'pending',
  },
  {
    id: 'REQ-1026',
    customerName: 'Meera Nair',
    serviceType: 'AC Maintenance',
    urgency: 'low',
    location: 'HSR Layout, BLR',
    requestedAt: '2025-11-27T06:30:00Z',
    charge: 950,
    description: 'Quarterly service for 2 split ACs',
    status: 'pending',
  },
];

const urgencyLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const generateId = () =>
  `note-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

export default function Dashboard({ user, onLogout }) {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchRequests = async () => {
      try {
        const response = await fetch('/data/requests.json');
        if (!response.ok) {
          throw new Error('Unable to fetch requests');
        }
        const data = await response.json();
        if (!ignore) {
          setRequests(data);
        }
      } catch (err) {
        if (!ignore) {
          setRequests(fallbackRequests);
          setError(' Showing sample data.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchRequests();
    const intervalId = setInterval(fetchRequests, 60_000);

    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, []);

  const summary = useMemo(() => {
    const pending = requests.filter(r => r.status === 'pending').length;
    const accepted = requests.filter(r => r.status === 'accepted').length;
    const declined = requests.filter(r => r.status === 'declined').length;
    return { pending, accepted, declined, total: requests.length };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesStatus =
        statusFilter === 'all' ? true : req.status === statusFilter;
      const matchesSearch = req.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        req.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchQuery]);

  const pushNotification = (message) => {
    setNotifications(prev => {
      const next = [
        {
          id: generateId(),
          message,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ];
      return next.slice(0, 4);
    });
  };

  const handleAction = (requestId, action) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: action,
              lastUpdated: new Date().toISOString(),
            }
          : req,
      ),
    );
    pushNotification(
      `You ${action === 'accepted' ? 'accepted' : 'declined'} ${requestId}`,
    );
  };

  const formatTimeAgo = (isoDate) => {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const minutes = Math.max(1, Math.round(diffMs / 60000));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome back</p>
          <h1 className="dashboard-title">
            {user?.username || 'Service Provider'}
          </h1>
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            🔔
            {summary.pending > 0 && (
              <span className="notification-count">{summary.pending}</span>
            )}
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="profile-strip">
        <div className="provider-card">
          <div className="avatar">{user?.username?.charAt(0) ?? 'Q'}</div>
          <div>
            <p className="provider-name">{user?.username}</p>
            <p className="provider-role">
              {user?.role === 'provider' ? 'Service Provider' : 'User'}
            </p>
            <p className="provider-email">{user?.email}</p>
          </div>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <p>Pending</p>
            <h3>{summary.pending}</h3>
          </div>
          <div className="stat-card">
            <p>Accepted</p>
            <h3>{summary.accepted}</h3>
          </div>
          <div className="stat-card">
            <p>Declined</p>
            <h3>{summary.declined}</h3>
          </div>
        </div>
        <div className="alerts-card">
          <p className="alerts-title">Live Feed</p>
          <ul>
            {notifications.length === 0 ? (
              <li>No new alerts</li>
            ) : (
              notifications.map(note => (
                <li key={note.id}>
                  <span>{note.message}</span>
                  <time>{formatTimeAgo(note.timestamp)}</time>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      <section className="controls-bar">
        <div className="filters">
          {['pending', 'accepted', 'declined', 'all'].map(status => (
            <button
              key={status}
              className={`filter-btn ${
                statusFilter === status ? 'active' : ''
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'all'
                ? 'All Requests'
                : `${status.charAt(0).toUpperCase()}${status.slice(1)}`}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search by customer or service..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="requests-section">
        <div className="section-header">
          <h2>Incoming Requests</h2>
          <p>{summary.total} total today</p>
        </div>

        {error && <div className="inline-error">{error}</div>}
        {isLoading ? (
          <div className="loader">Fetching latest requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="empty-state">
            <p>No requests matching your filters.</p>
          </div>
        ) : (
          <div className="requests-grid">
            {filteredRequests.map(request => (
              <article className="request-card" key={request.id}>
                <header>
                  <div>
                    <p className="request-id">{request.id}</p>
                    <h3>{request.customerName}</h3>
                    <p className="service-type">{request.serviceType}</p>
                  </div>
                  <span className={`urgency-badge ${request.urgency}`}>
                    {urgencyLabels[request.urgency]}
                  </span>
                </header>
                <p className="request-description">{request.description}</p>
                <ul className="request-meta">
                  <li>📍 {request.location}</li>
                  <li>🕒 {formatTimeAgo(request.requestedAt)}</li>
                  <li>💰 ₹{request.charge}</li>
                </ul>
                <footer className="card-actions">
                  <button
                    className="decline-btn"
                    disabled={request.status === 'declined'}
                    onClick={() => handleAction(request.id, 'declined')}
                  >
                    Decline
                  </button>
                  <button
                    className="accept-btn"
                    disabled={request.status === 'accepted'}
                    onClick={() => handleAction(request.id, 'accepted')}
                  >
                    Accept
                  </button>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

