import "../../styles/provider-completed.css";

export default function ProviderCompleted({ completed = [] }) {
  return (
    <>
      <h1 className="page-title">Completed Services</h1>

      {completed.length === 0 ? (
        <div className="empty-state">
          No completed services yet.
        </div>
      ) : (
        <div className="completed-grid">
          {completed.map(b => (
            <div key={b.id} className="completed-card">

              {/* HEADER */}
              <div className="completed-header">
                <h3>{b.serviceType}</h3>
                <span className="completed-amount">₹{b.finalAmount || b.amount || 0}</span>
              </div>

              {/* BODY */}
              <div className="completed-body">
                <p>📅 {b.bookingDateTime}</p>
                <p>📍 {b.address}</p>
                {b.description && <p>📝 {b.description}</p>}
              </div>

              {/* FEEDBACK SUMMARY */}
              <div className="feedback-summary">
                {b.rating ? (
                  <>
                    <RatingStars value={b.rating} />
                    {b.review && (
                      <p className="feedback-text">
                        “{b.review}”
                      </p>
                    )}
                  </>
                ) : (
                  <span className="no-feedback">
                    No customer feedback
                  </span>
                )}
              </div>

              {/* FOOTER */}
              <div className="completed-footer">
                <span className="status-badge">Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ===== SMALL HELPER ===== */
function RatingStars({ value }) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={i <= value ? "star filled" : "star"}
        >
          ★
        </span>
      ))}
      <span className="rating-value">{value}/5</span>
    </div>
  );
}
