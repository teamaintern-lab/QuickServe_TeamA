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

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const payload = {
          email: formData.email,
          password: formData.password,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };

        const res = await login(payload);

        if (!res.data.success) {
          alert("Invalid email or password.");
          return;
        }

        if (res.data.role !== "PROVIDER") {
          alert("This account is not a provider account.");
          return;
        }

        // STORE PROVIDER SESSION
        const provider = {
          userId: res.data.userId,
          fullName: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          category: res.data.category,
          customService: res.data.customService,
          latitude: res.data.latitude,
          longitude: res.data.longitude
        };

        setCurrentUser(provider);

        if (onLoginSuccess) {
          onLoginSuccess(provider);
        }

      } catch (err) {
        console.error(err);
        alert("Login failed. Please try again.");
      }
    },
    () => {
      alert("Location permission is required for providers.");
    }
  );
};

const handleForgotPassword = () => {
  if (!formData.email) {
    alert("Please enter your registered email first.");
    return;
  }

  if (onLoginSuccess) {
    onLoginSuccess({
      action: "FORGOT_PASSWORD",
      role: "PROVIDER",
      email: formData.email
    });
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
        <div className="forgot-password">
          <button
            type="button"
            className="link-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
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
