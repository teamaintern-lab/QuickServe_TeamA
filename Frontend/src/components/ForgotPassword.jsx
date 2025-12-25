import { useState } from "react";
import "../styles/Auth.css";

import {
  generateOtp,
  verifyEmailOtp,
  resetPassword
} from "../services/api";

export default function ForgotPassword({ email, role, onBack }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendOtp = async () => {
    try {
      await generateOtp({ email });
      alert("OTP has been sent to your registered email.");
      setStep(2);
    } catch {
      alert("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      await verifyEmailOtp({ email, otp });
      setStep(3);
    } catch {
      alert("Invalid or expired OTP.");
    }
  };

  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ email, newPassword });
      alert("Password reset successful. Please login.");
      onBack();
    } catch {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="auth-form-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="auth-header">
        <div className="login-icon-large">🔐</div>
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">
          {role === "PROVIDER"
            ? "Reset your service provider password"
            : "Reset your account password"}
        </p>
      </div>

      <div className="auth-form">
        {/* STEP 1: SEND OTP */}
        {step === 1 && (
          <>
            <div className="form-group">
              <label className="form-label">Registered Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="button"
              className="submit-btn otp-send-btn"
              onClick={sendOtp}
            >
              Send OTP
            </button>


          </>
        )}

        {/* STEP 2: VERIFY OTP */}
        {/* STEP 2: VERIFY OTP */}
        {step === 2 && (
          <>
            <div className="form-group">
              <label className="form-label">Enter OTP</label>
              <div className="input-wrapper">
                <span className="input-icon">🔢</span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-input"
                  placeholder="6-digit OTP"
                />
              </div>
            </div>

            <button
              type="button"
              className="submit-btn otp-verify-btn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

          </>
        )}
        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
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

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="button"
              className="submit-btn otp-reset-btn"
              onClick={updatePassword}
            >
              Reset Password
            </button>


          </>
        )}
      </div>

      <div className="auth-footer">
        <p className="footer-text">
          Secure password reset using OTP verification
        </p>
      </div>
    </div>
  );
}
