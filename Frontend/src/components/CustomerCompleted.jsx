import { useEffect, useState } from "react";
import "../styles/customer-completed.css";
import { sendFeedback, getCompletedBookings } from "../services/api";

export default function CustomerCompleted() {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const [localFeedback, setLocalFeedback] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [hover, setHover] = useState({});

  /* =========================
     FETCH COMPLETED BOOKINGS
     ========================= */
  useEffect(() => {
  setLoading(true);

  getCompletedBookings()
    .then(res => setCompleted(res.data || []))
    .catch(() => alert("Failed to load completed services"))
    .finally(() => setLoading(false));
}, []);
  /* =========================
     FEEDBACK HANDLERS
     ========================= */
  const handleChange = (id, field, value) => {
    setLocalFeedback(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value }
    }));
  };

  const submitFeedback = async (id) => {
  const fb = localFeedback[id];

  if (!fb || !fb.rating) {
    alert("Please provide a rating.");
    return;
  }

  try {
    await sendFeedback(id, {
      rating: Number(fb.rating),
      review: fb.comment || ""
    });

    setCompleted(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, rating: fb.rating, review: fb.comment }
          : b
      )
    );

    setEditingId(null);
    setLocalFeedback({});
    setHover({});
    alert("Feedback submitted!");
  } catch {
    alert("Failed to submit feedback.");
  }
};


  const startEdit = (b) => {
  if (Number(b.rating) > 0) return; // prevent editing

  setEditingId(b.id);
  setLocalFeedback({
    [b.id]: {
      rating: 0,
      comment: ""
    }
  });
  setHover({});
};


  const cancelEdit = () => {
    setEditingId(null);
    setLocalFeedback({});
    setHover({});
  };

  /* =========================
     UI STATES
     ========================= */
  if (loading) {
    return <div className="empty-state">Loading completed services…</div>;
  }

  if (completed.length === 0) {
    return <div className="empty-state">No completed services yet.</div>;
  }
  return (
    <div className="completed-container">
      <div className="completed-list">
        {completed.map(b => (
          <div key={b.id} className="completed-card">
            <div className="completed-header">
              <h3>{b.serviceType}</h3>
              <span className="completed-provider">{b.providerName}</span>
            </div>

            <p className="completed-meta">
              {b.bookingDateTime} • ₹{b.amount}
            </p>

            {editingId === b.id ? (
              <div className="feedback-form">
                <div className="star-row">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button
                      key={i}
                      type="button"
                      className={`star-btn ${
                        Math.max(hover[b.id] || 0, localFeedback[b.id]?.rating || 0) >= i
                          ? "filled"
                          : ""
                      }`}
                      onMouseEnter={() => setHover({ [b.id]: i })}
                      onMouseLeave={() => setHover({ [b.id]: 0 })}
                      onClick={() => handleChange(b.id, "rating", i)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  className="feedback-textarea"
                  placeholder="Write your feedback (optional)"
                  value={localFeedback[b.id]?.comment || ""}
                  onChange={e => handleChange(b.id, "comment", e.target.value)}
                />

                <div className="feedback-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => submitFeedback(b.id)}
                  >
                    Save
                  </button>
                  <button
                    className="action-btn"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
               {Number(b.rating) > 0 ? (
  <>
    <div>Rating: {"⭐".repeat(b.rating)}</div>
    {b.review && (
      <div className="review-text">{b.review}</div>
    )}
  </>
) : (

                  <button
                    className="action-btn primary"
                    onClick={() => startEdit(b)}
                  >
                    Give Feedback
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
