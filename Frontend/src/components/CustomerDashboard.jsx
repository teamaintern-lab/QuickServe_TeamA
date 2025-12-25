import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import CustomerHome from "./CustomerHome";
import CustomerProfile from "./CustomerProfile";
import CustomerCompleted from "./CustomerCompleted";
import "../styles/dashboard.common.css";
import "../styles/customer-dashboard.css";
import "../styles/customer-support.css";
import {
  getMyBookings,
  getMyTickets,
  createTicket,
  cancelBooking
} from "../services/api";
/* STATUS STYLES */
const statusStyles = {
  REQUESTED: { bg: "#E0E7FF", text: "#3730A3" },
  CONFIRMED: { bg: "#DBEAFE", text: "#1D4ED8" },
  ACCEPTED: { bg: "#D1FAE5", text: "#065F46" },
  COMPLETED: { bg: "#DCFCE7", text: "#166534" },
  CANCELLED: { bg: "#FEE2E2", text: "#991B1B" }
};

export default function CustomerDashboard({ user, onLogout, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState("home");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [preselectedService, setPreselectedService] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookingSubmit = () => {
    setShowBookingForm(false);
    showNotification("Booking submitted!", "success");
    getMyBookings().then(res => setBookings(res.data));
  };

  const openBookingForService = (serviceType) => {
    setPreselectedService(serviceType || "");
    setShowBookingForm(true);
    setActiveTab("bookings");
  };

  useEffect(() => {
    getMyBookings()
      .then(res => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, []);
const [tickets, setTickets] = useState([]);

const fetchTickets = async () => {
  const res = await getMyTickets();

  const ticketsArray = Array.isArray(res.data) ? res.data : [];
  setTickets(ticketsArray);
};


useEffect(() => {
  fetchTickets();
}, []);


  return (
    <div className="dashboard-container">

      {/* NOTIFICATION */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* FIXED TOP HEADER (ONLY HEADER IN FILE) */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="user-avatar">🛍️</div>
          <div>
            <div className="user-name">{user.fullName}</div>
            <div className="user-role">Customer</div>
          </div>
        </div>

        <div className="header-tabs">
          <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>🏠 Home</button>
          <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>📅 My Bookings</button>
          <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>✅ Completed</button>
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>👤 Profile</button>
          <button className={activeTab === "support" ? "active" : ""} onClick={() => setActiveTab("support")}>💬 Support</button>
        </div>

        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* MAIN CONTENT (NO EXTRA WRAPPERS ABOVE) */}
      <div className="dashboard-main">

        <h1 className="page-title">
          {activeTab === "home" && "Explore Services"}
          {activeTab === "bookings" && "My Bookings"}
          {activeTab === "completed" && "Completed Services"}
          {activeTab === "profile" && "My Profile"}
          {activeTab === "support" && "Support"}
        </h1>

        {activeTab === "home" && <CustomerHome onBook={openBookingForService} />}

        {activeTab === "bookings" && (
          <div className="tab-content bookings-tab">
            <button
              className="new-booking-btn"
              onClick={() => {
                setPreselectedService("");
                setShowBookingForm(true);
              }}
            >
              + New Booking
            </button>

            <div className="bookings-grid">
              {bookings.map(b => (
                <div key={b.id} className="booking-card">
                  <h3>{b.serviceType}</h3>

                  <span
                    className="status-pill"
                    style={{
                      backgroundColor: statusStyles[b.status]?.bg || "#E5E7EB",
                      color: statusStyles[b.status]?.text || "#374151"
                    }}
                  >
                    {b.status}
                  </span>

                  <p>📅 {b.bookingDateTime || "Not Selected"}</p>
                  <p>💰 ₹{b.amount || 0}</p>
                  <p>🏢 {b.providerName || "Pending Assignment"}</p>

                  <button
                    className="view-details-btn"
                    onClick={() => setSelectedBooking(b)}
                  >
                    View Details →
                  </button>

                  {/* ✅ CANCEL BOOKING */}
                  {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
                    <button
                      className="action-btn danger"
                      onClick={async () => {
                        if (!window.confirm("Cancel this booking?")) return;

                        try {
                          await cancelBooking(b.id);
                          showNotification("Booking cancelled", "success");
                          const res = await getMyBookings();
                          setBookings(res.data);
                        } catch {
                          alert("Failed to cancel booking");
                        }
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
</div>
        )}
{activeTab === "completed" && <CustomerCompleted />}

        {activeTab === "profile" && (
  <CustomerProfile
    user={user}
    onUpdateUser={onUpdateUser}
  />
)}
        {activeTab === "support" && (
          <div className="tab-content support-tab">
            <div className="ticket-header-row">
              <button className="create-ticket-btn" onClick={() => setShowCreateTicket(true)}>
                + Create New Ticket
              </button>
            </div>

            {tickets.length === 0 && (
              <p className="empty-text">No support tickets yet</p>
            )}

            {tickets.map(t => (
              <div key={t.id} className="support-ticket">
                <h3>{t.subject}</h3>
                <p>{t.createdAt?.slice(0,10)}</p>
                <button className="action-btn" onClick={() => setSelectedTicket(t)}>
                  View Ticket
                </button>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* MODALS */}
      {showBookingForm && (
        <BookingForm
          onClose={() => {
            setShowBookingForm(false);
            setPreselectedService("");
          }}
          onSubmit={handleBookingSubmit}
          defaultService={preselectedService}
        />
      )}

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
      {showCreateTicket && (
  <CreateTicketModal
    onClose={() => setShowCreateTicket(false)}
    onCreated={fetchTickets}
  />

)}
{selectedTicket && (
  <ViewTicketModal
    ticket={selectedTicket}
    onClose={() => setSelectedTicket(null)}
  />
)}
    </div>
  );
}
/* BOOKING DETAILS MODAL */
function BookingDetailsModal({ booking, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content details-modal">
        <div className="details-header">
          <h2>Booking Details</h2>

          <span
            className="status-pill"
            style={{
              backgroundColor: statusStyles[booking.status]?.bg,
              color: statusStyles[booking.status]?.text
            }}
          >
            {booking.status}
          </span>

          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="details-body">
          <div className="details-row"><span>Service</span><strong>{booking.serviceType}</strong></div>
          <div className="details-row"><span>Date & Time</span><strong>{booking.bookingDateTime || "Not Selected"}</strong></div>
          <div className="details-row"><span>Provider</span><strong>{booking.providerName || "Pending Assignment"}</strong></div>
          <div className="details-row"><span>Address</span><strong>{booking.address}</strong></div>
          <div className="details-row"><span>Description</span><strong>{booking.description}</strong></div>
          <div className="details-row"><span>Phone</span><strong>{booking.phone}</strong></div>
          <div className="details-row"><span>Amount</span><strong>₹{booking.amount || 0}</strong></div>
        </div>

        <div className="details-footer">
          <button className="action-btn primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
function CreateTicketModal({ onClose , onCreated}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createTicket({ subject, description });

      if (res.data?.id) {
        alert("Support ticket created successfully");
        onCreated();     // 🔥 refresh list
        onClose();
      }
    } catch (e) {
      alert("Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content details-modal">
        <div className="support-modal-body">
          <h2>Create Support Ticket</h2>

          <div className="support-field">
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </div>

          <div className="support-field">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue"
            />
          </div>

          <div className="support-actions">
            <button
              className="action-btn primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <button
              className="action-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewTicketModal({ ticket, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content details-modal">
        <h2>{ticket.subject}</h2>

        <p>
          <strong>Date:</strong>{" "}
          {ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleDateString()
            : "—"}
        </p>

        <p>
          <strong>Status:</strong> {ticket.status}
        </p>

        <div className="details-footer">
          <button className="action-btn primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
