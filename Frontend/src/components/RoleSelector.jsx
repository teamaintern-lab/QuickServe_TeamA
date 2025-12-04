import '../styles/Auth.css';

export default function RoleSelector({ onSelectRole, onRegister }) {
  return (
    <div className="role-container">
      <div className="role-wrapper">
        <div className="role-header">
          <h1 className="role-title">Welcome to QuickServe</h1>
          <p className="role-subtitle">Choose how you want to continue</p>
        </div>

        <div className="role-cards">
          <div className="role-card customer-card">
            <div className="role-icon">🛍️</div>
            <h2 className="role-card-title">Customer</h2>
            <p className="role-card-desc">Book services from trusted providers</p>
            <div className="role-card-actions">
              <button
                onClick={() => onSelectRole('customer')}
                className="role-btn customer-btn"
              >
                Login
              </button>
            </div>
          </div>

          <div className="role-card provider-card">
            <div className="role-icon">🏢</div>
            <h2 className="role-card-title">Service Provider</h2>
            <p className="role-card-desc">Offer your services to customers</p>
            <div className="role-card-actions">
              <button
                onClick={() => onSelectRole('provider')}
                className="role-btn provider-btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="role-footer">
          <p className="role-footer-text">
            New to QuickServe?{' '}
            <button onClick={onRegister} className="register-link">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
