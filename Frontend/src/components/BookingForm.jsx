import { useState, useEffect } from "react";
import "../styles/booking-form.css";
<<<<<<< HEAD
import { createBooking, getProviders, getProfile } from "../services/api";
import MapComponent from "../components/Map/MapComponent";

=======
<<<<<<< HEAD
import { createBooking, getProviders } from "../services/api";
import { getProfile } from "../services/api";
import MapComponent from "../components/Map/MapComponent";

export default function BookingForm({
  onClose,
  onSubmit,
  defaultService,
  providerLocation
}) {

const [address, setAddress] = useState("");
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
const [loadingLocation, setLoadingLocation] = useState(true);
const [isSubmitting, setIsSubmitting] = useState(false);

const [providers, setProviders] = useState([]);

const [formData, setFormData] = useState({
  serviceType: "",
  providerId: "",
  urgency: "medium",
  address: "",
  description: "",
  date: "",
  time: "",
  phone: "",
  amount: ""
});

const selectedProvider = providers.find(
  p => p.id === Number(formData.providerId)
);


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
    getProviders()
      .then(res => setProviders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProviders([]));
  }, []);

 useEffect(() => {
   if (defaultService) {
     setFormData(prev => ({ ...prev, serviceType: defaultService }));
   }
 }, [defaultService]);

useEffect(() => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);

      // Reverse geocode (OpenStreetMap)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      setAddress(data.display_name || "");
      setLoadingLocation(false);
    },
    () => {
      alert("Unable to fetch location");
      setLoadingLocation(false);
    }
  );
}, []);
useEffect(() => {
  setFormData(prev => ({
    ...prev,
    address: address
  }));
}, [address]);

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

const handleCancel = () => {
  onClose();
};

  const urgencyLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
=======
import { createBooking, getProviders, getProfile } from "../services/api";
import MapComponent from "../components/Map/MapComponent";

>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    serviceType: defaultService || "",
=======
    serviceType: "",
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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

<<<<<<< HEAD
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
=======
<<<<<<< HEAD
=======
  /* ---------------- DEFAULT SERVICE ---------------- */
  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, serviceType: defaultService }));
    }
  }, [defaultService]);
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

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
      } catch {}
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

>>>>>>> 7e6c529 (final updated code)
  const validateForm = () => {
    const e = {};

    if (!formData.serviceType) e.serviceType = "Select a service";
    if (!formData.providerId) e.providerId = "Select a provider";
    if (!address) e.address = "Address required";
    if (!formData.description) e.description = "Enter description";
<<<<<<< HEAD
    if (!formData.date) e.date = "Select date";
    if (!formData.time) e.time = "Select time";
    if (!formData.phone || formData.phone.length !== 10)
      e.phone = "Enter valid phone number";
    if (!latitude || !longitude) e.location = "Location required";
=======
<<<<<<< HEAD
    if (!formData.date) e.date = "Choose date";
    if (!formData.time) e.time = "Choose time";
    if (!formData.amount || formData.amount <= 0) e.amount = "Enter valid amount";
=======
    if (!formData.date) e.date = "Select date";
    if (!formData.time) e.time = "Select time";
>>>>>>> 7e6c529 (final updated code)
    if (!formData.phone || formData.phone.length !== 10)
      e.phone = "Enter valid phone number";
    if (!latitude || !longitude) e.location = "Location required";

    if (!latitude || !longitude) {
      e.location = "Location access is required";
    }
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

<<<<<<< HEAD
=======
<<<<<<< HEAD
const bookingPayload = {
  serviceType: formData.serviceType,
  providerId: formData.providerId,
  urgency: formData.urgency,
  description: formData.description,
  address: formData.address,
  bookingDateTime: `${formData.date} ${formData.time}`,
  phone: formData.phone,
  amount: parseFloat(formData.amount),
  customerLatitude: latitude,
  customerLongitude: longitude
};

=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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
>>>>>>> 7e6c529 (final updated code)

    console.log("Booking payload:", payload);

    console.log("Booking payload:", payload);

    try {
      setIsSubmitting(true);
      const res = await createBooking(bookingPayload);

      if (res.data?.id) {
        onSubmit?.();
        onClose();
      } else {
        alert("Booking failed");
      }
<<<<<<< HEAD
    } catch {
      alert("Booking failed. Try again.");
    }
=======
<<<<<<< HEAD
    } catch (err) {
  console.error(err);

  if (err.response?.data?.message) {
    alert(err.response.data.message);
  } else if (err.response?.status === 401) {
    alert("Session expired. Please login again.");
  } else {
    alert("Booking failed. Please try again.");
  }
} finally {
  setIsSubmitting(false);
}
=======
    } catch {
      alert("Booking failed. Try again.");
    }
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
  };
const bookingMapLocations =
  latitude && longitude
    ? [
        {
          id: "customer",
          name: "Your Location",
          latitude,
          longitude
        },
        {
          id: "provider",
          name: providerLocation.name,
          latitude: providerLocation.latitude,
          longitude: providerLocation.longitude
        }
      ]
    : [];

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
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
                .filter(
                  p =>
                    p.category === formData.serviceType ||
                    p.custom_service === formData.serviceType
                )

                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.experience || 1} yrs)
                  </option>
=======
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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
<<<<<<< HEAD
=======
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
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

<<<<<<< HEAD
          {/* FIXED ACTIONS */}
=======
<<<<<<< HEAD
{/* MAP PREVIEW */}
{errors.location && (
  <span className="error-message">{errors.location}</span>
)}

{latitude && longitude && selectedProvider && (

  <div className="form-group">
    <label className="form-label">Service Provider Location Preview</label>

    {latitude && longitude && selectedProvider && (
      <MapComponent
        locations={bookingMapLocations}
        height="250px"
      />
    )}

  </div>
)}

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
{latitude && longitude && (
  <div style={{ marginBottom: "16px" }}>
    <MapComponent
      locations={[
        {
          id: "customer",
          name: "Your Location",
          latitude,
          longitude
        }
      ]}
      height="300px"
      draggable={true}
      onLocationChange={(lat, lng, newAddress) => {
        setLatitude(lat);
        setLongitude(lng);
        if (newAddress) setAddress(newAddress);
      }}
    />
  </div>
)}

          {/* ADDRESS */}
         <div className="form-group">
           <label>Service(Customer) Address</label>
           <textarea
             value={address}
             onChange={(e) => setAddress(e.target.value)}
             placeholder="Address will be auto-filled from map"
             required
           />
         </div>

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

          {/* AMOUNT */}
          <div className="form-group">
            <label className="form-label">Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`form-input ${errors.amount ? "input-error" : ""}`}
              placeholder="Enter service amount"
              min="0"
              step="0.01"
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

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
=======
          {/* FIXED ACTIONS */}
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
          <div className="form-actions">
            <button type="button" className="action-btn secondary" onClick={onClose}>
              Cancel
            </button>
<<<<<<< HEAD
            <button type="submit" className="action-btn primary">
              Book Now
            </button>
=======
<<<<<<< HEAD

            <button
              type="submit"
              className="action-btn primary"
              disabled={!latitude || !longitude || isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>

=======
            <button type="submit" className="action-btn primary">
              Book Now
            </button>
>>>>>>> 7e6c529 (final updated code)
>>>>>>> 562cdde93932ada8ce0c7d439ebcf1519a84b47b
          </div>
        </form>
      </div>
    </div>
  );
}
