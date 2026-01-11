import { useState, useEffect } from "react";
import {
    getAdminOverview,
    getAdminUsers,
    deleteAdminUser,
    getAdminServices,
    addAdminService,
    updateAdminService,
    deleteAdminService
} from "../services/api";
import "../styles/AdminDashboard.css"; // Use new premium styles

export default function AdminDashboard({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // New service form state
    const [newService, setNewService] = useState({ name: "", description: "", price: "" });
    const [editingServiceId, setEditingServiceId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            if (activeTab === "overview") {
                const res = await getAdminOverview();
                setStats(res.data);
            } else if (activeTab === "users") {
                const res = await getAdminUsers();
                setUsers(res.data);
            } else if (activeTab === "services") {
                const res = await getAdminServices();
                setServices(res.data);
            }
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteAdminUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert("Failed to delete user.");
        }
    };

    const handleAddOrUpdateService = async (e) => {
        e.preventDefault();
        try {
            if (editingServiceId) {
                await updateAdminService(editingServiceId, newService);
                setEditingServiceId(null);
            } else {
                await addAdminService(newService);
            }
            setNewService({ name: "", description: "", price: "" });
            fetchData();
        } catch (err) {
            alert("Failed to save service.");
        }
    };

    const handleEditService = (s) => {
        setNewService({ name: s.name, description: s.description, price: s.price });
        setEditingServiceId(s.id);
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await deleteAdminService(id);
            fetchData();
        } catch (err) {
            alert("Failed to delete service.");
        }
    };
    return (
        <div className="admin-layout">

            {/* TOP NAVBAR */}
            <header className="admin-navbar">
                <div className="navbar-left">
                    <span className="logo-icon">⚡</span>
                    <span className="navbar-title">Admin Panel</span>
                </div>

                <nav className="navbar-links">
                    <button
                        className={activeTab === "overview" ? "active" : ""}
                        onClick={() => setActiveTab("overview")}
                    >
                        📊 Overview
                    </button>

                    <button
                        className={activeTab === "users" ? "active" : ""}
                        onClick={() => setActiveTab("users")}
                    >
                        👥 Users
                    </button>

                    <button
                        className={activeTab === "services" ? "active" : ""}
                        onClick={() => setActiveTab("services")}
                    >
                        🛠 Services
                    </button>
                </nav>

                <div className="navbar-right">
                    <span className="admin-name">{user?.fullName}</span>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="admin-content">
                <header className="main-header">
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back, {user?.fullName}</p>
                </header>

                {error && <div className="error-banner">{error}</div>}

                <div className="dashboard-content">
                    {activeTab === "overview" && stats && (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Users</h3>
                                <p className="stat-value">{stats.totalUsers}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Service Providers</h3>
                                <p className="stat-value">{stats.totalProviders}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Bookings</h3>
                                <p className="stat-value">{stats.totalBookings}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Active Services</h3>
                                <p className="stat-value">{stats.totalServices}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.fullName}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`role-badge ${u.role.toLowerCase()}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    disabled={u.email === 'admin@quickserve.com'}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "services" && (
                        <div className="services-management">
                            <form className="service-form" onSubmit={handleAddOrUpdateService}>
                                <h3>{editingServiceId ? "Edit Service" : "Add New Service"}</h3>
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newService.price}
                                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                    required
                                />
                                <div className="form-actions">
                                    <button type="submit" className="save-btn">
                                        {editingServiceId ? "Update" : "Add Service"}
                                    </button>
                                    {editingServiceId && (
                                        <button type="button" onClick={() => { setEditingServiceId(null); setNewService({ name: "", description: "", price: "" }) }}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>

                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map(s => (
                                            <tr key={s.id}>
                                                <td>{s.name}</td>
                                                <td>${s.price}</td>
                                                <td>
                                                    <button className="edit-btn" onClick={() => handleEditService(s)}>Edit</button>
                                                    <button className="delete-btn" onClick={() => handleDeleteService(s.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
