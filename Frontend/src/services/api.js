import axios from "axios";

/* ===============================
   SINGLE AXIOS INSTANCE
================================ */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

/* ===============================
   AUTH
================================ */
export const login = (data) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
export const getSession = () => api.get("/auth/session");

export const resendOtp = (data) =>
  api.post("/auth/resend-otp", data);

/* ===============================
   USER
================================ */
export const getProfile = () => api.get("/users/me");
export const updateProfile = (data) => api.put("/users/me", data);

/* ===============================
   BOOKINGS (CUSTOMER)
================================ */
export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings/mine");
export const getCompletedBookings = () => api.get("/bookings/completed");
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);
export const sendFeedback = (bookingId, data) =>
  api.post(`/bookings/${bookingId}/feedback`, data);

/* ===============================
   PROVIDERS (CUSTOMER VIEW)
================================ */
export const getProviders = () => api.get("/users/providers");

/* ===============================
   PROVIDER DASHBOARD
================================ */
export const getProviderDashboardStats = () =>
  api.get("/provider/dashboard");

export const getProviderCalendar = () =>
  api.get("/provider/calendar");

export const getProviderRequests = () =>
  api.get("/provider/requests");

export const acceptRequest = (id) =>
  api.put(`/provider/requests/${id}/accept`);

export const declineRequest = (id) =>
  api.put(`/provider/requests/${id}/decline`);

export const completeRequest = (id) =>
  api.put(`/provider/requests/${id}/complete`);

export const getProviderProfile = () =>
  api.get("/provider/profile");

export const updateProviderProfile = (data) =>
  api.put("/provider/profile", data);

export const getProviderEarnings = () =>
  api.get("/provider/earnings");

export const getProviderCompleted = () =>
  api.get("/provider/completed");

/* ===============================
   SUPPORT TICKETS
================================ */
export const getMyTickets = () =>
  api.get("/tickets/mine");

export const createTicket = (payload) =>
  api.post("/tickets", payload);

/* ===============================
   ADMIN
================================ */
export const getAdminOverview = () => api.get("/admin/overview");
export const getAdminUsers = () => api.get("/admin/users");
export const deleteAdminUser = (id) =>
  api.delete(`/admin/users/${id}`);

export const getAdminServices = () => api.get("/admin/services");
export const addAdminService = (data) =>
  api.post("/admin/services", data);

export const updateAdminService = (id, data) =>
  api.put(`/admin/services/${id}`, data);

export const deleteAdminService = (id) =>
  api.delete(`/admin/services/${id}`);

/* ===============================
   DEFAULT EXPORT
================================ */
export default api;

export const generateOtp = (email) =>
  api.post("/auth/generate-otp", { email });

export const verifyEmailOtp = (data) =>
  api.post("/auth/verify-email-otp", data);

export const signup = (data) =>
  api.post("/auth/signup", data);

