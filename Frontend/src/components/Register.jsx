import { useState } from 'react';
import '../styles/Auth.css';

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    category: '',
    customService: '',
    experience: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'provider' && !formData.category.trim()) {
      newErrors.category = 'Please select a service category';
    }

    if (formData.role === 'provider' && formData.category === 'other' && !formData.customService.trim()) {
      newErrors.customService = 'Please describe your service';
    }

    // Provider-specific: experience required, phone optional
    if (formData.role === 'provider') {
      if (!String(formData.experience).trim()) {
        newErrors.experience = 'Please enter years of experience';
      } else if (!/^\d+$/.test(String(formData.experience)) || parseInt(formData.experience, 10) < 0) {
        newErrors.experience = 'Enter a valid number of years';
      }

      if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Enter a valid phone number (7-15 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === 'provider') {
      userData.category = formData.category;
      userData.experience = formData.experience;
      userData.phone = formData.phone || '';
      if (formData.category === 'other') {
        userData.customService = formData.customService;
      }
    }

    const success = onRegister(userData);
    if (success) {
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
        category: '',
        customService: '',
        experience: '',
        phone: '',
      });
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us today</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
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
              className={`form-input ${errors.password ? 'input-error' : ''}`}
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
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>
        )}

        {formData.role === 'provider' && (
          <div className="form-group">
            <label htmlFor="experience" className="form-label">
              Years of Experience
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📈</span>
              <input
                type="text"
                id="experience"
                name="experience"
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

        {formData.role === 'provider' && (
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number (optional)
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +919876543210"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
              />
            </div>
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        )}

        {formData.role === 'provider' && formData.category === 'other' && (
          <div className="form-group">
            <label htmlFor="customService" className="form-label">
              Describe Your Service
            </label>
            <div className="input-wrapper">
              <span className="input-icon">💼</span>
              <input
                type="text"
                id="customService"
                name="customService"
                value={formData.customService}
                onChange={handleChange}
                placeholder="e.g., Home Renovation, Pet Sitting, Tutoring..."
                className={`form-input ${errors.customService ? 'input-error' : ''}`}
              />
            </div>
            {errors.customService && (
              <span className="error-message">{errors.customService}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-btn register-btn">
          Create Account
        </button>
      </form>

      <div className="auth-footer">
        <p className="footer-text">Your data is safe with us</p>
      </div>
    </div>
  );
}
