import { useState } from "react";
import "../styles/Auth.css";
import { login } from "../services/api";
import { setCurrentUser } from "../services/session";

export default function ProviderLogin({ onBack, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await login({
        email: formData.email,
        password: formData.password
      });

      if (!res.data.success) {
        alert("Invalid email or password.");
        return;
      }

      if (res.data.role !== "PROVIDER") {
        alert("This account is not a provider account.");
        return;
      }

      // STORE USER SESSION
      // STORE USER SESSION (FIXED: include email & service)
const provider = {
  userId: res.data.userId,
  fullName: res.data.fullName,
  email: res.data.email,
  role: res.data.role,
  category: res.data.category,
  customService: res.data.customService
};

setCurrentUser(provider);

// INFORM PARENT TO NAVIGATE TO DASHBOARD
if (onLoginSuccess) {
  onLoginSuccess(provider);
}


    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
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
          <label className="form-label">Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-input"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
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
