import { useState, useEffect } from "react";
import "../styles/booking-form.css";
import { createBooking, getProviders, getProfile } from "../services/api";
import MapComponent from "../components/Map/MapComponent";

export default function BookingForm({
  onClose,
  onSubmit,
  defaultService,
  providerLocation
}) {
  const [providers, setProviders] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    serviceType: defaultService || "",
    providerId: "",
    urgency: "medium",
    description: "",
    date: "",
    time: "",
    phone: "",
    customerEstimatedPrice: ""
  });

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    getProfile()
      .then(res => {
        setUserProfile(res.data);
        setFormData(prev => ({ ...prev, phone: res.data.phone || "" }));
      })
      .catch(() => {});
  }, []);

  /* ---------------- LOAD PROVIDERS ---------------- */
  useEffect(() => {
    getProviders()
      .then(res => setProviders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProviders([]));
  }, []);

  /* ---------------- DEFAULT SERVICE ---------------- */
  // useEffect(() => {
  //   if (defaultService) {
  //     setFormData(prev => ({ ...prev, serviceType: defaultService }));
  //   }
  // }, [defaultService]);

  /* ---------------- GEOLOCATION ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setAddress(data.display_name || "");
      } catch(err){
        console.error("Failed to get address from coordinates:", err);
      }
    });
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "serviceType" ? { providerId: "" } : {})
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const e = {};
    if (!formData.serviceType) e.serviceType = "Select a service";
    if (!formData.providerId) e.providerId = "Select a provider";
    if (!address) e.address = "Address required";
    if (!formData.description) e.description = "Enter description";
    if (!formData.date) e.date = "Select date";
    if (!formData.time) e.time = "Select time";
    if (!formData.phone || formData.phone.length !== 10)
      e.phone = "Enter valid phone number";
    if (!latitude || !longitude) e.location = "Location required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    // Combine date and time into bookingDateTime
    const bookingDateTime = formData.date && formData.time
      ? `${formData.date} ${formData.time}`
      : "";

    const payload = {
      serviceType: formData.serviceType,
      providerId: formData.providerId ? Number(formData.providerId) : null,
      urgency: formData.urgency,
      description: formData.description,
      bookingDateTime,
      phone: formData.phone,
      address,
      customerLatitude: latitude,
      customerLongitude: longitude,
      customerEstimatedPrice: formData.customerEstimatedPrice ? Number(formData.customerEstimatedPrice) : null
    };

    console.log("Booking payload:", payload);

    try {
      const res = await createBooking(payload);
      if (res.data?.id) {
        onSubmit?.();
        onClose();
      } else {
        alert("Booking failed");
      }
    } catch {
      alert("Booking failed. Try again.");
    }
  };

  const serviceCategories = [
    ...new Set(
      providers
        .filter(p => p.role === "PROVIDER")
        .map(p => p.category || p.custom_service)
        .filter(Boolean)
    )
  ];

  const selectedProvider = providers.find(
    p => p.id === Number(formData.providerId)
  );

  const mapLocations =
    latitude && longitude
      ? [
          { id: "customer", name: "Your Location", latitude, longitude },
          ...(selectedProvider && providerLocation
            ? [{
                id: "provider",
                name: selectedProvider.fullName,
                latitude: providerLocation.latitude,
                longitude: providerLocation.longitude
              }]
            : [])
        ]
      : [];

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Book a Service</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-form-body">

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
                {serviceCategories.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
            </div>

            {/* PROVIDER */}
            <div className="form-group">
              <label className="form-label">Service Provider *</label>
              <select
                name="providerId"
                value={formData.providerId}
                onChange={handleChange}
                className={`form-select ${errors.providerId ? "input-error" : ""}`}
              >
                <option value="">Select provider</option>
                {providers
                  .filter(p =>
                    p.category === formData.serviceType ||
                    p.custom_service === formData.serviceType
                  )
                  .map(p => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.experience || 1} yrs)
                    </option>
                  ))}
              </select>
              {errors.providerId && <span className="error-message">{errors.providerId}</span>}
            </div>

            {/* PROVIDER CONTACT INFO */}
            {selectedProvider && (
              <>
                <div className="form-group">
                  <label className="form-label">Provider Email</label>
                  <input className="form-input" value={selectedProvider.email || ""} disabled />
                </div>

                <div className="form-group">
                  <label className="form-label">Provider Phone</label>
                  <input className="form-input" value={selectedProvider.phone || ""} disabled />
                </div>
              </>
            )}

            {/* MAP */}
            {mapLocations.length > 0 && (
              <div className="form-group">
                <label className="form-label">Service Location *</label>
                <div className="map-wrapper">
                  <MapComponent locations={mapLocations} />
                </div>
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            )}

            {/* ADDRESS */}
            <div className="form-group">
              <label className="form-label">Service Address *</label>
              <textarea
                className="form-textarea"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? "input-error" : ""}`}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            {/* ESTIMATED PRICE */}
            <div className="form-group">
              <label className="form-label">Estimated Price (Optional)</label>
              <input
                type="number"
                name="customerEstimatedPrice"
                value={formData.customerEstimatedPrice}
                onChange={handleChange}
                placeholder="Enter your estimated price in ₹"
                className="form-input"
                min="0"
                step="0.01"
              />
              <small className="form-hint">This is optional. Provider may provide their own estimate.</small>
            </div>

            {/* DATE */}
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-input ${errors.date ? "input-error" : ""}`}
              />
            </div>

            {/* TIME */}
            <div className="form-group">
              <label className="form-label">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`form-input ${errors.time ? "input-error" : ""}`}
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={userProfile?.email || ""} disabled />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label className="form-label">Contact Number *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? "input-error" : ""}`}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

          </div>

          {/* FIXED ACTIONS */}
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
