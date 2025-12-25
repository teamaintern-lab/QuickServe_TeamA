export default function ProviderEarnings({ earnings }) {
  if (!earnings) {
    return <p>Loading earnings...</p>;
  }

  return (
    <>
      <h1 className="page-title">Earnings</h1>

      <div className="dashboard-card">
        <h3 className="card-title">Earnings Summary</h3>

        <div className="earnings-grid">
          <div className="earn-item">
            <span className="earn-label">Total Earnings</span>
            <strong className="earn-value">₹{earnings.total}</strong>
          </div>

          <div className="earn-item">
            <span className="earn-label">Pending Amount</span>
            <strong className="earn-value">₹{earnings.pending}</strong>
          </div>

          <div className="earn-item">
            <span className="earn-label">Average / Job</span>
            <strong className="earn-value">₹{earnings.avg}</strong>
          </div>

          <div className="earn-item">
            <span className="earn-label">Completed Jobs</span>
            <strong className="earn-value">
              {earnings.completedCount}
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}
