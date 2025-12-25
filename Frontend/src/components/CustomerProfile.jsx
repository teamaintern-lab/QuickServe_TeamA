import { useState, useEffect } from "react";
import "../styles/customer-profile.css";
import { getProfile, updateProfile } from "../services/api";

export default function CustomerProfile({ user, onUpdateUser }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    getProfile().then(res => {
      setProfile(res.data);
      setForm({
        fullName: res.data.fullName,
        phone: res.data.phone || "",
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProfile(form);
      if (res.data.success) {
        setProfile(prev => ({ ...prev, ...form }));
        onUpdateUser?.({ ...user, ...form });
        setEditing(false);
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch {
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  if (!profile) return <div className="empty-state">Loading profile…</div>;

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-top">
        <div className="profile-user">
          <div className="profile-avatar">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{profile.fullName}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        {!editing && (
          <button
            className="btn-primary"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* DETAILS CARD */}
      <div className="profile-card">
        <h3>Customer Details</h3>

        <div className="profile-row">
          <span>Full Name</span>
          {editing ? (
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          ) : (
            <strong>{profile.fullName}</strong>
          )}
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>{profile.email}</strong>
        </div>

        <div className="profile-row">
          <span>Phone</span>
          {editing ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          ) : (
            <strong>{profile.phone || "—"}</strong>
          )}
        </div>

        {editing && (
          <div className="profile-actions">
            <button
              className="btn-primary"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setEditing(false);
                setForm({
                  fullName: profile.fullName,
                  phone: profile.phone || "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
