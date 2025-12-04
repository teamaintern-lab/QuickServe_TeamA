import { useState } from 'react';
import '../styles/Dashboard.css';

export default function BookingForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    serviceType: '',
    urgency: 'medium',
    address: '',
    description: '',
    date: '',
    time: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const serviceTypes = [
    { value: 'electrical', label: 'Electrical Services' },
    { value: 'plumbing', label: 'Plumbing Services' },
    { value: 'cleaning', label: 'Cleaning Services' },
    { value: 'carpentry', label: 'Carpentry Services' },
    { value: 'painting', label: 'Painting Services' },
    { value: 'ac-maintenance', label: 'AC Maintenance & Repair' },
    { value: 'appliance-repair', label: 'Appliance Repair' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'landscaping', label: 'Landscaping & Gardening' },
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority (Urgent)' },
  ];

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

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Please provide a complete address';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe what you need';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setFormData({
      serviceType: '',
      urgency: 'medium',
      address: '',
      description: '',
      date: '',
      time: '',
      phone: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content booking-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2 className="modal-title">Book a Service</h2>
          <p className="modal-subtitle">Fill in the details and find the right service provider</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType" className="form-label">
                Service Type <span className="required">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`form-select ${errors.serviceType ? 'input-error' : ''}`}
              >
                <option value="">-- Select a service --</option>
                {serviceTypes.map(service => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <span className="error-message">{errors.serviceType}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="urgency" className="form-label">
                Urgency Level <span className="required">*</span>
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="form-select"
              >
                {urgencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Service Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              className={`form-input ${errors.address ? 'input-error' : ''}`}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Describe Your Need <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what service you need (e.g., Power outage in kitchen, need urgent repair...)"
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              rows="4"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Preferred Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-input ${errors.date ? 'input-error' : ''}`}
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time" className="form-label">
                Preferred Time <span className="required">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`form-input ${errors.time ? 'input-error' : ''}`}
              />
              {errors.time && (
                <span className="error-message">{errors.time}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="action-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-btn primary">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
