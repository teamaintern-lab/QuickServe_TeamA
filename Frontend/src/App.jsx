import { useState, useEffect } from "react";
import Home from "./components/Home";
import RoleSelector from "./components/RoleSelector";
import Register from "./components/Register";
import CustomerLogin from "./components/CustomerLogin";
import ProviderLogin from "./components/ProviderLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import { getSession } from "./services/api";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetRole, setResetRole] = useState("");

  // Navigation handlers
  const openRoleSelector = () => setScreen("roleSelector");
  const openRegister = () => setScreen("register");

  useEffect(() => {
    // Session recovery on mount
    const recoverSession = async () => {
      try {
        const resp = await getSession();
        if (resp.data.success) {
          handleLoginSuccess(resp.data);
        }
      } catch (err) {
        // No active session or error, ignore
      }
    };
    recoverSession();
  }, []);

  const handleLoginSuccess = (data) => {

    // FORGOT PASSWORD FLOW
    if (data?.action === "FORGOT_PASSWORD") {
      setResetEmail(data.email);
      setResetRole(data.role);
      setScreen("forgotPassword");
      return;
    }

    // NORMAL LOGIN FLOW
    const formattedUser = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || "",
      role: data.role,
      category: data.category || "",
      customService: data.customService || ""
    };

    setCurrentUser(formattedUser);

    if (formattedUser.role === "CUSTOMER") {
      setScreen("customerDashboard");
    } else if (formattedUser.role === "PROVIDER") {
      setScreen("providerDashboard");
    } else if (formattedUser.role === "ADMIN") {
      setScreen("adminDashboard");
    }
  };


  const goHome = () => setScreen("home");

  return (
    <>
      {screen === "home" && (
        <Home
          onOpenRoleSelector={openRoleSelector}
          onOpenRegister={openRegister}
        />
      )}

      {screen === "roleSelector" && (
        <div className="role-container">
          <RoleSelector
            onSelectRole={(role) =>
              role === "customer"
                ? setScreen("customerLogin")
                : setScreen("providerLogin")
            }
            onRegister={() => setScreen("register")}
            onBack={goHome}
          />
        </div>
      )}

      {screen === "register" && (
        <div className="auth-container">
          <Register
            onRegister={() => setScreen("roleSelector")}
            onBack={() => setScreen("home")}
          />
        </div>
      )}

      {screen === "customerLogin" && (
        <div className="auth-container">
          <CustomerLogin
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setScreen("roleSelector")}
          />
        </div>
      )}

      {screen === "providerLogin" && (
        <div className="auth-container">
          <ProviderLogin
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setScreen("roleSelector")}
          />
        </div>
      )}

      {screen === "customerDashboard" && (
        <CustomerDashboard
          user={currentUser}
          onLogout={() => {
            setCurrentUser(null);
            setScreen("home");
          }}
        />
      )}

      {screen === "providerDashboard" && (
        <ProviderDashboard
          user={currentUser}
          onLogout={() => {
            setCurrentUser(null);
            setScreen("home");
          }}
        />
      )}

      {screen === "adminDashboard" && (
        <AdminDashboard
          user={currentUser}
          onLogout={() => {
            setCurrentUser(null);
            setScreen("home");
          }}
        />
      )}
      {screen === "forgotPassword" && (
        <div className="auth-container">
          <ForgotPassword
            email={resetEmail}
            role={resetRole}
            onBack={() => setScreen(
              resetRole === "CUSTOMER"
                ? "customerLogin"
                : "providerLogin"
            )}
          />
        </div>
      )}

    </>
  );
}
