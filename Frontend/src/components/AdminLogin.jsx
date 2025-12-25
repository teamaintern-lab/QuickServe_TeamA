import { useState } from "react";
import "../styles/Auth.css";
import { login } from "../services/api";
import { setCurrentUser } from "../services/session";

export default function AdminLogin({ onBack, onLoginSuccess }) {
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

            if (res.data.role !== "ADMIN") {
                setErrorMsg("This account is not an admin account.");
                return;
            }

            const admin = {
                userId: res.data.userId,
                fullName: res.data.fullName,
                role: res.data.role
            };

            setCurrentUser(admin);

            if (onLoginSuccess) {
                onLoginSuccess(admin);
            }

        } catch (err) {
            console.error(err);
            const msg =
                err?.response?.data?.message ||
                err.message ||
                "Login failed. Please try again.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container admin-login">
            <button className="back-btn" onClick={onBack} aria-label="Back">
                ← Back
            </button>

            <div className="auth-header">
                <div className="login-icon-large">🛡️</div>
                <h1 className="auth-title admin-title">Admin Login</h1>
                <p className="auth-subtitle">Manage system and services</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {errorMsg && <div className="form-error">{errorMsg}</div>}

                <div className="form-group">
                    <label className="form-label">Admin Email</label>
                    <div className="input-wrapper">
                        <span className="input-icon">✉️</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="admin@quickserve.com"
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
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-btn admin-btn"
                    disabled={loading}
                >
                    {loading ? "Verifying…" : "Sign In as Admin"}
                </button>
            </form>

            <div className="auth-footer">
                <p className="footer-text">Restricted Area: Authorized Personnel Only</p>
            </div>
        </div>
    );
}
