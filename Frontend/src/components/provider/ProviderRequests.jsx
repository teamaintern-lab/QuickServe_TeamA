import {
  acceptRequest,
  declineRequest,
  completeRequest
} from "../../services/api";

export default function ProviderRequests({ requests, onRefresh, onSelect, onChat }) {


  const statusColor = (status) => {
    switch (status) {
      case "REQUESTED": return "#f5a623";
      case "ACCEPTED": return "#4a90e2";
      case "COMPLETED": return "#2ecc71";
      case "DECLINED": return "#e74c3c";
      default: return "#999";
    }
  };

  const handleAccept = async (id) => {
    await acceptRequest(id);
    onRefresh();
  };

  const handleDecline = async (id) => {
    await declineRequest(id);
    onRefresh();
  };

  const handleComplete = async (id) => {
    await completeRequest(id);
    onRefresh();
  };

  return (
    <>
      <h1 className="page-title">Service Requests</h1>

      {requests.length === 0 ? (
        <p>No service requests available.</p>
      ) : (
        <div className="requests-list">
            {requests.map(req => (
              <div
                key={req.id}
                className="request-card"
                onClick={() => onSelect(req)}
              >

              {/* HEADER */}
              <div className="request-header">
                <h3>{req.serviceType}</h3>
                <span
                  className="status-pill"
                  style={{ backgroundColor: statusColor(req.status) }}
                >
                  {req.status}
                </span>
              </div>

              {/* DETAILS */}
              <p>📍 {req.address}</p>
              <p>📅 {req.bookingDateTime}</p>
              <p>💰 ₹{req.amount}</p>

              {/* ACTIONS */}
              {req.status === "REQUESTED" && (
                <div className="request-actions">
                  <button
                    className="action-btn primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(req.id);
                    }}
                  >

                    Accept
                  </button>

                  <button
                    className="action-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecline(req.id);
                    }}
                  >

                    Decline
                  </button>
                </div>
              )}

              {req.status === "ACCEPTED" && (
                <button
                   className="action-btn primary"
                   onClick={(e) => {
                     e.stopPropagation();
                     handleComplete(req.id);
                   }}
                 >
                  Mark Completed
                </button>
              )}

              {req.status === "ACCEPTED" && (
                <button
                  className="chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChat(req);
                  }}
                >
                  💬 Chat
                </button>
              )}

            </div>
          ))}
        </div>
      )}
    </>
  );
}
