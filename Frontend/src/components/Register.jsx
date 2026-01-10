import "../styles/Auth.css";
import { signup, verifyEmailOtp, generateOtp } from "../services/api";
import { useState, useRef } from "react";

export default function Register({ onRegister, onBack }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    category: "",
    customService: "",
    experience: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
const [emailOtp, setEmailOtp] = useState("");
const [cooldown, setCooldown] = useState(0);
const [otpSent, setOtpSent] = useState(false);
const [sendingOtp, setSendingOtp] = useState(false);
const [emailVerified, setEmailVerified] = useState(false);
const cooldownTimerRef = useRef(null);

 const validateForm = () => {
   const e = {};

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const phoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers

   if (!formData.username.trim())
     e.username = "Username required";

   if (!formData.email.trim())
     e.email = "Email required";
   else if (!emailRegex.test(formData.email))
     e.email = "Enter a valid email address";

   if (formData.phone && !phoneRegex.test(formData.phone)) {
     e.phone = "Enter a valid 10-digit phone number";
   }

   if (!formData.password)
     e.password = "Password required";

   if (formData.password !== formData.confirmPassword)
     e.confirmPassword = "Passwords do not match";

   if (formData.role === "provider") {
     if (!formData.category.trim())
       e.category = "Category required";

     if (formData.category === "other" && !formData.customService.trim())
       e.customService = "Describe your service";

     if (!String(formData.experience).trim())
       e.experience = "Experience required";
   }

   setErrors(e);
   return Object.keys(e).length === 0;
 };
const startCooldown = () => {
  setCooldown(120);

  // clear any existing timer
  if (cooldownTimerRef.current) {
    clearInterval(cooldownTimerRef.current);
  }

  cooldownTimerRef.current = setInterval(() => {
    setCooldown((prev) => {
      if (prev <= 1) {
        clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

const handleGenerateOtp = async () => {
  if (!formData.email || errors.email) {
    alert("Enter a valid email first");
    return;
  }

  try {
    setSendingOtp(true);
    await generateOtp({ email: formData.email });
    setOtpSent(true);
    startCooldown();
    alert("OTP sent to your email");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send OTP");
  } finally {
    setSendingOtp(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && value !== "other"
        ? { customService: "" }
        : {}),
    }));
  };

const handleOtpVerify = async () => {
  try {
    await verifyEmailOtp({
      email: formData.email.trim().toLowerCase(),
      otp: emailOtp.trim(),
    });
    setEmailVerified(true);

    // ✅ STOP COOLDOWN IMMEDIATELY
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
    setCooldown(0);
    setOtpSent(false);

    alert("Email verified. You can now complete registration.");

  } catch (err) {
    alert(err.response?.data?.message || "OTP verification failed");
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!emailVerified) {
    alert("Please verify your email first");
    return;
  }

  if (!validateForm()) return;

  try {
    await signup({
      fullName: formData.username,
      email: formData.email,
      phone: formData.phone || null,
      password: formData.password,
      role: formData.role === "provider" ? "PROVIDER" : "CUSTOMER",
      category: formData.role === "provider" ? formData.category : null,
      customService:
        formData.role === "provider" ? formData.customService || null : null,
      experience:
        formData.role === "provider" ? Number(formData.experience) : null,
    });
    alert("Account created successfully. Please login.");
    onRegister(); // ✅ redirect to login
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="auth-container">

      {/* NAVBAR */}
      <nav className="auth-navbar">
        <button className="back-to-home-btn" onClick={onBack}>
          ← Home
        </button>
      </nav>

      <div className="auth-form-container">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us today</p>
        </div>
        <form
  onSubmit={handleSubmit}
  className="auth-form">
        <div className="form-">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name!!"
              className={`form-input ${errors.username ? 'input-error' : ''}`}
            />
          </div>
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>
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
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

       <button
         type="button"
         className="submit-btn register-btn"
         onClick={handleGenerateOtp}
         disabled={
           emailVerified ||        
           !formData.email ||
           errors.email ||
           sendingOtp ||
           cooldown > 0
         }

         style={{
           marginTop: "8px",
           width: "100%",
           opacity:
             emailVerified ||
             !formData.email ||
             errors.email ||
             cooldown > 0
               ? 0.6
               : 1,
           cursor:
             emailVerified ||
             !formData.email ||
             errors.email ||
             cooldown > 0
               ? "not-allowed"
               : "pointer",
}}
       >
          {emailVerified
            ? "Email Verified"
            : sendingOtp
            ? "Sending OTP..."
            : cooldown > 0
            ? `Resend OTP in ${cooldown}s`
            : "Generate OTP"}
        </button>
{cooldown > 0 && !emailVerified && (
  <p>You can resend OTP in {cooldown}s</p>
)}

        {/* ================= EMAIL OTP ================= */}
        {!emailVerified && (
          <div className="form-group" style={{ padding: "15px" }}>
            <h3>Email Verification</h3>
            <label className="form-label">Email OTP</label>
            <input
              type="text"
              className="form-input"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              placeholder="Enter Email OTP"
            />

            <button
              type="button"
              className="submit-btn register-btn"
              onClick={handleOtpVerify}
              disabled={!otpSent || emailOtp.trim().length !== 6}
              style={{
                marginTop: "10px",
                opacity: !otpSent || emailOtp.trim().length !== 6 ? 0.6 : 1,
                cursor: !otpSent || emailOtp.trim().length !== 6 ? "not-allowed" : "pointer",
              }}
            >
              Verify OTP
            </button>
          </div>
        )}

<div className="form-group">
  <label htmlFor="phone" className="form-label">
    Phone Number
  </label>
  <div className="input-wrapper">
    <span className="input-icon">📞</span>
    <input
       type="tel"
       id="phone"
       name="phone"
       value={formData.phone}
       onChange={handleChange}
       placeholder="10-digit mobile number"
       maxLength="10"
       className={`form-input ${errors.phone ? "input-error" : ""}`}
     />

  </div>
  {errors.phone && (
    <span className="error-message">{errors.phone}</span>
  )}
</div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`form-input ${errors.password ? "input-error" : ""}`}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">🔐</span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role" className="form-label">
            I am a
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>
        </div>

        {formData.role === 'provider' && (
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Type of Service
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'input-error' : ''}`}
            >
              <option value="">-- Select a service category --</option>
              <option value="electrical">Electrical Services</option>
              <option value="plumbing">Plumbing Services</option>
              <option value="cleaning">Cleaning Services</option>
              <option value="carpentry">Carpentry Services</option>
              <option value="painting">Painting Services</option>
              <option value="ac-maintenance">AC Maintenance & Repair</option>
              <option value="appliance-repair">Appliance Repair</option>
              <option value="pest-control">Pest Control</option>
              <option value="landscaping">Landscaping & Gardening</option>
              <option value="other">Other Services</option>
            </select>
            {formData.role === "provider" && formData.category === "other" && (
              <div className="form-group">
                <label htmlFor="customService" className="form-label">
                  Describe Your Service
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🛠️</span>
                  <input
                    type="text"
                    id="customService"
                    name="customService"
                    value={formData.customService}
                    onChange={handleChange}
                    placeholder="Enter your service type"
                    className={`form-input ${
                      errors.customService ? "input-error" : ""
                    }`}
                  />
                </div>
                {errors.customService && (
                  <span className="error-message">{errors.customService}</span>
                )}
              </div>
            )}
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>
        )}
        {formData.role === "provider" && (
  <div className="form-group">
    <label htmlFor="experience" className="form-label">
      Years of Experience
    </label>
    <div className="input-wrapper">
      <span className="input-icon">📊</span>
      <input
        type="number"
        id="experience"
        name="experience"
        min="0"
        value={formData.experience}
        onChange={handleChange}
        placeholder="e.g., 3"
        className={`form-input ${errors.experience ? 'input-error' : ''}`}
      />
    </div>
    {errors.experience && (
      <span className="error-message">{errors.experience}</span>
    )}
  </div>
)}
        <button
          type="submit"
          className="submit-btn register-btn"
          disabled={!emailVerified}
          style={{
            opacity: !emailVerified ? 0.6 : 1,
            cursor: !emailVerified ? "not-allowed" : "pointer",
          }}
        >
          Create Account
        </button>
      </form>
      <div className="auth-footer">
        <p className="footer-text">Your data is safe with us</p>
      </div>
      </div>
    </div>
  );
}