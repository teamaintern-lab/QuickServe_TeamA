import { useState, useEffect } from "react";
import "../styles/booking-form.css";
import { createBooking, getProviders } from "../services/api";
import { getProfile } from "../services/api";

export default function BookingForm({ onClose, onSubmit, defaultService = "" }) {

  const [providers, setProviders] = useState([]);
const [userProfile, setUserProfile] = useState(null);
useEffect(() => {
  getProfile()
    .then(res => {
      setUserProfile(res.data);

      // Auto-fill phone from DB
      setFormData(prev => ({
        ...prev,
        phone: res.data.phone || ""
      }));
    })
    .catch(() => {
      console.error("Failed to load user profile");
    });
}, []);

  useEffect(() => {
  getProviders().then(res => setProviders(res.data || []));
}, []);
 useEffect(() => {
   if (defaultService) {
     setFormData(prev => ({ ...prev, serviceType: defaultService }));
   }
 }, [defaultService]);

  const serviceCategories = [
    ...new Set(
      providers
        .filter(p => p.role === "PROVIDER")
        .map(p => {
          // Prefer category if valid, else fallback to custom_service
          if (p.category && p.category.trim() && p.category !== "other") {
            return p.category;
          }
          if (p.custom_service && p.custom_service.trim()) {
            return p.custom_service;
          }
          return null;
        })
        .filter(Boolean) // removes null / undefined
    )
  ];


  const urgencyLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const [formData, setFormData] = useState({
  serviceType: "",
  providerId: "",
  urgency: "medium",
  address: "",
  description: "",
  date: "",
  time: "",
  phone: "",
});


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === "serviceType" ? { providerId: "" } : {})
  }));

  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: "" }));
  }
};


  const validateForm = () => {
    const e = {};
    if (!formData.serviceType) e.serviceType = "Select a service";
    if (!formData.providerId) e.providerId = "Select a provider";
    if (!formData.address) e.address = "Enter address";
    if (!formData.description) e.description = "Enter description";
    if (!formData.date) e.date = "Choose date";
    if (!formData.time) e.time = "Choose time";
    if (!formData.phone || formData.phone.length !== 10)
      e.phone = "Enter valid phone number";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      serviceType: formData.serviceType,
      providerId: Number(formData.providerId),
      providerName:
        providers.find(p => p.id === Number(formData.providerId))?.fullName || "",
      urgency: formData.urgency,
      address: formData.address,
      description: formData.description,
      phone: formData.phone,
      bookingDateTime: `${formData.date} ${formData.time}`,
      amount: 499.0,
    };

    try {
      const res = await createBooking(payload);
      if (res.data?.id) {
        onSubmit?.();
        onClose();
      } else {
        alert("Booking failed");
      }
    } catch (err) {
  console.error(err);

  if (err.response?.status === 401) {
    alert("Session expired. Please login again.");
  } else {
    alert("Booking failed. Please try again.");
  }
}
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content booking-modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">Book a Service</h2>

        <form onSubmit={handleSubmit} className="booking-form">

          {/* SERVICE TYPE */}
          <div className="form-group">
            <label className="form-label">Service Type *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`form-select ${errors.serviceType ? "input-error" : ""}`}
            >
              <option value="">Select service</option>
              {serviceCategories.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
          </div>

          {/* PROVIDER */}
          <div className="form-group">
            <label className="form-label">Provider *</label>
            <select
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              className={`form-select ${errors.providerId ? "input-error" : ""}`}
            >
              <option value="">-- Select Provider --</option>
              {providers
                .filter(p => p.category === formData.serviceType)
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.experience || 1} yrs)
                  </option>
                ))}
            </select>
            {errors.providerId && <span className="error-message">{errors.providerId}</span>}
          </div>

          {/* URGENCY */}
          <div className="form-group">
            <label className="form-label">Urgency *</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="form-select"
            >
              {urgencyLevels.map(u => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>

          {/* ADDRESS */}
          <input
  name="address"
  value={formData.address}
  onChange={handleChange}
  className={`form-input ${errors.address ? "input-error" : ""}`}
  placeholder="Enter address"
/>
          {/* DESCRIPTION */}
          <textarea
  name="description"
  value={formData.description}
  onChange={handleChange}
  className={`form-textarea ${errors.description ? "input-error" : ""}`}
  placeholder="Describe your issue"
/>


          {/* DATE & TIME */}
          <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  className={`form-input ${errors.date ? "input-error" : ""}`}
/>

<input
  type="time"
  name="time"
  value={formData.time}
  onChange={handleChange}
  className={`form-input ${errors.time ? "input-error" : ""}`}
/>

{/* EMAIL (READ ONLY) */}
<div className="form-group">
  <label className="form-label">Email</label>
  <input
    type="email"
    value={userProfile?.email || ""}
    className="form-input"
    disabled
  />
</div>

<input
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  className={`form-input ${errors.phone ? "input-error" : ""}`}
  placeholder="10-digit phone number"
/>
          <div className="form-actions">
            <button
              type="button"
              className="action-btn secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="action-btn primary">Book Now</button>
          </div>

        </form>
      </div>
    </div>
  );
  }
