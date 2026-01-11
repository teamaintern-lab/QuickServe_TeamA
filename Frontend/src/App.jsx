import { useState, useEffect } from "react";
import Home from "./components/Home";
import RoleSelector from "./components/RoleSelector";
import Register from "./components/Register";
import CustomerLogin from "./components/CustomerLogin";
import ProviderLogin from "./components/ProviderLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import AdminLogin from "./components/AdminLogin";
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
    const checkSession = async () => {
      // 1. Check for Session-Sticky Admin in sessionStorage
      const sessionAdmin = sessionStorage.getItem("sessionAdmin");
      if (sessionAdmin) {
        try {
          const parsedAdmin = JSON.parse(sessionAdmin);
          setCurrentUser(parsedAdmin);
          setScreen("adminDashboard");
          console.log("Session-Sticky Admin restored.");
          return;
        } catch (e) {
          console.error("Error parsing sessionAdmin", e);
        }
      }

      // 2. Standard session check (fallback)
      try {
        const res = await getSession();
        if (res.data && res.data.success && res.data.role === "ADMIN") {
          handleLoginSuccess(res.data);
        }
      } catch (err) {
        console.log("No active admin session.");
      }
    };
    checkSession();
  }, []);

  const handleLoginSuccess = (data) => {
    if (data?.action === "FORGOT_PASSWORD") {
      setResetEmail(data.email);
      setResetRole(data.role);
      setScreen("forgotPassword");
      return;
    }

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

    if (formattedUser.role === "ADMIN") {
      // SAVE TO SESSION STORAGE FOR PERSISTENCE
      sessionStorage.setItem("sessionAdmin", JSON.stringify(formattedUser));
      setScreen("adminDashboard");
    } else if (formattedUser.role === "CUSTOMER") {
      setScreen("customerDashboard");
    } else if (formattedUser.role === "PROVIDER") {
      setScreen("providerDashboard");
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
                : role === "provider"
                  ? setScreen("providerLogin")
                  : setScreen("adminLogin")
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
      {screen === "adminLogin" && (
        <div className="auth-container">
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setScreen("roleSelector")}
          />
        </div>
      )}

      {screen === "adminDashboard" && (
        <AdminDashboard
          user={currentUser}
          onLogout={async () => {
            try {
              await import("./services/api").then(m => m.logout());
            } catch (e) {
              console.error("Backend logout failed", e);
            }
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
