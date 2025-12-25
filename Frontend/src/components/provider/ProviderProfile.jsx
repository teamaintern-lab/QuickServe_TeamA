import { useEffect, useState } from "react";
import {
  getProviderProfile,
  updateProviderProfile
} from "../../services/api";
import "../../styles/provider-profile.css";

export default function ProviderProfile({ user, onUserUpdate }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    category: "",
    customService: "",
    experience: "",
    phone: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getProviderProfile();
    const p = res.data;

    setForm({
      fullName: p.fullName || "",
      email: p.email || "",
      category: p.category || "",
      customService: p.customService || "",
      experience: p.experience || "",
      phone: p.phone || ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      customService: form.customService,
      experience: form.experience
    };

    await updateProviderProfile(payload);

    setSaving(false);
    setEditing(false);

    // Update parent dashboard user context
    onUserUpdate({
      ...user,
      fullName: form.fullName,
      customService: form.customService
    });
  };

  return (
  <div className="provider-profile-page">

    {/* TWO COLUMN SPLIT */}
    <div className="provider-profile-grid">

      {/* LEFT COLUMN */}
      <div className="profile-section">
        <h3 className="section-title">Personal Details</h3>

        {/* Full Name */}
<div className="profile-row">
  <label>Full Name</label>
  {editing ? (
    <input
      name="fullName"
      value={form.fullName}
      onChange={handleChange}
    />
  ) : (
    <span className="profile-value">{form.fullName || "—"}</span>
  )}
</div>

{/* Email (always text) */}
<div className="profile-row">
  <label>Email</label>
  <span className="profile-value">{form.email || "—"}</span>
</div>

{/* Phone */}
<div className="profile-row">
  <label>Phone</label>
  {editing ? (
    <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
    />
  ) : (
    <span className="profile-value">{form.phone || "—"}</span>
  )}
</div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="profile-section">
        <h3 className="section-title">Service Details</h3>

        {/* Service Category */}
<div className="profile-row">
  <label>Service Category</label>
  <span className="profile-value">{form.category || "—"}</span>
</div>

{/* Service Name */}
<div className="profile-row">
  <label>Service Name</label>
  {editing ? (
    <input
      name="customService"
      value={form.customService}
      onChange={handleChange}
    />
  ) : (
    <span className="profile-value">
      {form.customService || "—"}
    </span>
  )}
</div>

{/* Experience */}
<div className="profile-row">
  <label>Experience (years)</label>
  {editing ? (
    <input
      name="experience"
      value={form.experience}
      onChange={handleChange}
    />
  ) : (
    <span className="profile-value">
      {form.experience || "—"}
    </span>
  )}
</div>

      </div>

    </div>

    {/* ACTION BUTTONS */}
    <div className="profile-actions-bar">
      {!editing ? (
        <button className="action-btn primary" onClick={() => setEditing(true)}>
          Edit Profile
        </button>
      ) : (
        <>
          <button
            className="action-btn primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="action-btn"
            onClick={() => {
              setEditing(false);
              loadProfile();
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>

  </div>
);
}