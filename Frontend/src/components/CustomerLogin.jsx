import { useState } from "react";
import "../styles/Auth.css";
import { login } from "../services/api";
import { setCurrentUser } from "../services/session";

export default function CustomerLogin({ onBack, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!res?.data) {
        setErrorMsg("Unexpected server response.");
        return;
      }

      if (!res.data.success) {
        setErrorMsg(res.data.message || "Invalid email or password.");
        return;
      }

      if (res.data.role !== "CUSTOMER") {
        setErrorMsg("This account is not a customer account.");
        return;
      }

      // Store the logged-in customer
      const customer = {
        userId: res.data.userId,
        fullName: res.data.fullName,
        role: res.data.role
      };

      setCurrentUser(customer);

      // Navigate to customer dashboard
      if (onLoginSuccess) {
        onLoginSuccess(customer);
      }

      // clear form (optional)
      setFormData({ email: "", password: "" });

    } catch (err) {
      console.error(err);
      // Prefer showing server message when available
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };
// Navigate to OTP-based Forgot Password flow
const handleForgotPassword = () => {
  if (!formData.email) {
    setErrorMsg("Please enter your registered email first.");
    return;
  }

  if (onLoginSuccess) {
    onLoginSuccess({
      action: "FORGOT_PASSWORD",
      role: "CUSTOMER",
      email: formData.email
    });
  }
};

  return (
    <div className="auth-form-container customer-login">
      <button className="back-btn" onClick={onBack} aria-label="Back">
        ← Back
      </button>

      <div className="auth-header">
        <div className="login-icon-large">🛍️</div>
        <h1 className="auth-title customer-title">Customer Login</h1>
        <p className="auth-subtitle">Access your bookings and services</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {errorMsg && <div className="form-error">{errorMsg}</div>}

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
              aria-label={showPassword ? "Hide password" : "Show password"}
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

        <button
          type="submit"
          className="submit-btn customer-btn"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In as Customer"}
        </button>
      </form>

      <div className="auth-footer">
        <p className="footer-text">Secure login with encryption</p>
      </div>
    </div>
  );
}
