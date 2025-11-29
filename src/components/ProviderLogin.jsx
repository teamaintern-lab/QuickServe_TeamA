import { useState } from 'react';
import '../styles/Auth.css';

export default function ProviderLogin({ onLogin, onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }

    const success = onLogin(formData.email, formData.password, 'provider');
    if (success) {
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="auth-form-container provider-login">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="auth-header">
        <div className="login-icon-large">🏢</div>
        <h1 className="auth-title provider-title">Service Provider Login</h1>
        <p className="auth-subtitle">Manage your services and bookings</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <div className="input-wrapper">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn provider-btn">
          Sign In as Provider
        </button>
      </form>

      <div className="auth-footer">
        <p className="footer-text">Secure login with encryption</p>
      </div>
    </div>
  );
}
