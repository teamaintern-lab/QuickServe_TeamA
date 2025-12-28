import { useState } from 'react';
import BookingForm from './BookingForm';
import '../styles/Dashboard.css';

export default function CustomerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 'BK-001',
      service: 'Electrical Repair',
      provider: 'John Electricals',
      date: '2025-12-05',
      time: '10:00 AM',
      amount: 780,
      status: 'confirmed',
      rating: 0,
    },
    {
      id: 'BK-002',
      service: 'Plumbing Service',
      provider: 'Quick Plumbers',
      date: '2025-12-08',
      time: '02:00 PM',
      amount: 500,
      status: 'pending',
      rating: 0,
    },
    {
      id: 'BK-003',
      service: 'AC Maintenance',
      provider: 'Cool Care Services',
      date: '2025-11-20',
      time: '11:00 AM',
      amount: 950,
      status: 'completed',
      rating: 5,
    },
  ]);

  const [supportTickets] = useState([
    {
      id: 'TK-001',
      subject: 'Service Quality Issue',
      status: 'open',
      date: '2025-11-28',
    },
    {
      id: 'TK-002',
      subject: 'Payment Refund Request',
      status: 'resolved',
      date: '2025-11-25',
    },
  ]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookingSubmit = (formData) => {
    const newBooking = {
      id: `BK-${String(bookings.length + 1).padStart(3, '0')}`,
      service: formData.serviceType,
      provider: 'Pending Assignment',
      date: formData.date,
      time: formData.time,
      amount: Math.floor(Math.random() * 2000) + 300,
      status: 'pending',
      rating: 0,
    };
    setBookings([newBooking, ...bookings]);
    setShowBookingForm(false);
    showNotification('✓ Booking request submitted successfully! Providers will respond soon.', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4a90e2';
      case 'pending':
        return '#f5a623';
      case 'completed':
        return '#7ed321';
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="dashboard-container">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">🛍️</div>
          <div className="user-info">
            <h3 className="user-name">{user.username}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-role">Customer</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span className="nav-icon">📅</span> My Bookings
          </button>
          <button
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="nav-icon">📜</span> History
          </button>
          <button
            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <span className="nav-icon">⭐</span> Favorites
          </button>
          <button
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <span className="nav-icon">💬</span> Support
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
            {activeTab === 'bookings' && 'My Bookings'}
            {activeTab === 'history' && 'Service History'}
            {activeTab === 'favorites' && 'Favorite Providers'}
            {activeTab === 'support' && 'Support Tickets'}
          </h1>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-value">{bookings.length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">₹{bookings.reduce((sum, b) => sum + b.amount, 0)}</span>
              <span className="stat-label">Total Spent</span>
            </div>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="tab-content">
            <div className="bookings-header">
              <h2 className="section-title">Current Bookings</h2>
              <button
                className="action-btn primary"
                onClick={() => setShowBookingForm(true)}
              >
                + New Booking
              </button>
            </div>
            
            {bookings.filter(b => b.status !== 'completed').length === 0 ? (
              <div className="empty-state">
                <p>No active bookings. Ready to book a service?</p>
                <button
                  className="action-btn primary"
                  onClick={() => setShowBookingForm(true)}
                >
                  Book Now
                </button>
              </div>
            ) : (
              <div className="bookings-grid">
                {bookings.filter(b => b.status !== 'completed').map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h3 className="booking-service">{booking.service}</h3>
                      <span
                        className="booking-status"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p className="detail-item">
                        <span className="detail-icon">🏢</span>
                        <span>{booking.provider}</span>
                      </p>
                      <p className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>{booking.date} at {booking.time}</span>
                      </p>
                      <p className="detail-item">
                        <span className="detail-icon">💰</span>
                        <span>₹{booking.amount}</span>
                      </p>
                    </div>
                    <div className="booking-actions">
                      <button className="action-btn primary">View Details</button>
                      {booking.status === 'pending' && (
                        <button className="action-btn danger">Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content">
            {bookings.filter(b => b.status === 'completed').length === 0 ? (
              <div className="empty-state">
                <p>No completed services yet</p>
              </div>
            ) : (
              <div className="history-list">
                {bookings.filter((b) => b.status === 'completed').map((booking) => (
                  <div key={booking.id} className="history-item">
                    <div className="history-info">
                      <h3>{booking.service}</h3>
                      <p>{booking.provider}</p>
                      <p className="history-date">{booking.date}</p>
                    </div>
                    <div className="history-meta">
                      <div className="rating">
                        {'⭐'.repeat(booking.rating)}{' '}
                        {booking.rating > 0 && <span>({booking.rating}/5)</span>}
                      </div>
                      <p className="history-amount">₹{booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="tab-content">
            <div className="favorites-grid">
              <div className="favorite-card">
                <div className="favorite-header">🏪 Cool Care Services</div>
                <p className="favorite-type">AC Maintenance</p>
                <div className="rating-full">⭐⭐⭐⭐⭐ (4.8)</div>
                <button className="action-btn primary">Book Now</button>
              </div>
              <div className="favorite-card">
                <div className="favorite-header">🔧 John Electricals</div>
                <p className="favorite-type">Electrical Repair</p>
                <div className="rating-full">⭐⭐⭐⭐ (4.5)</div>
                <button className="action-btn primary">Book Now</button>
              </div>
              <div className="favorite-card">
                <div className="favorite-header">🚰 Quick Plumbers</div>
                <p className="favorite-type">Plumbing Services</p>
                <div className="rating-full">⭐⭐⭐⭐⭐ (4.9)</div>
                <button className="action-btn primary">Book Now</button>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="tab-content">
            <button className="create-ticket-btn">+ Create New Ticket</button>
            <div className="support-tickets">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="support-ticket">
                  <div className="ticket-header">
                    <h3>{ticket.subject}</h3>
                    <span
                      className="ticket-status"
                      style={{
                        backgroundColor:
                          ticket.status === 'open' ? '#f5a623' : '#7ed321',
                      }}
                    >
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="ticket-date">{ticket.date}</p>
                  <button className="action-btn">View Ticket</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}
