import { useMemo, useState } from "react";
import "../../styles/dashboard.common.css";
import "../../styles/provider-calendar.css";

export default function ProviderCalendar({ requests = [] }) {
  const [view, setView] = useState("week"); // week | month
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = useMemo(() => {
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
          address: r.address,
          amount: r.amount,
          status: r.status,
        };
      });
  }, [requests]);

  const visibleEvents =
    view === "week" ? events.slice(0, 7) : events;

  return (
    <>
      <div className="calendar-header">
        <h1 className="page-title">Calendar</h1>

        <div className="calendar-toggle">
          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {visibleEvents.length === 0 ? (
          <div className="empty-state">
            No scheduled services
          </div>
        ) : (
          visibleEvents.map(e => (
            <div
              key={e.id}
              className={`calendar-event ${e.status.toLowerCase()}`}
              onClick={() => setSelectedEvent(e)}
            >
              <div className="event-date">📅 {e.date}</div>
              <strong>{e.service}</strong>
              <div className="event-time">⏰ {e.time}</div>
            </div>
          ))
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.service}</h2>

            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Address:</strong> {selectedEvent.address}</p>
            <p><strong>Amount:</strong> ₹{selectedEvent.amount}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>

            <button
              className="action-btn primary"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
