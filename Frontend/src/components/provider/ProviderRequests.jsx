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
    const providerEstimatedPrice = prompt("Enter your estimated price (₹) - optional:");
    const price = providerEstimatedPrice ? parseFloat(providerEstimatedPrice) : null;
    await acceptRequest(id, price);
    onRefresh();
  };

  const handleDecline = async (id) => {
    await declineRequest(id);
    onRefresh();
  };

  const handleComplete = async (id) => {
    const finalAmount = prompt("Enter the final amount (₹) - required:");
    if (!finalAmount || isNaN(parseFloat(finalAmount))) {
      alert("Please enter a valid final amount.");
      return;
    }
    await completeRequest(id, parseFloat(finalAmount));
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
              {req.description && <p>📝 {req.description}</p>}
              {req.customerEstimatedPrice && <p>💰 Customer Estimate: ₹{req.customerEstimatedPrice}</p>}
              {req.providerEstimatedPrice && <p>💰 Your Estimate: ₹{req.providerEstimatedPrice}</p>}
              {req.finalAmount && <p>💰 Final Amount: ₹{req.finalAmount}</p>}
              {!req.customerEstimatedPrice && !req.providerEstimatedPrice && !req.finalAmount && <p>💰 Amount: ₹{req.amount || 0}</p>}

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
