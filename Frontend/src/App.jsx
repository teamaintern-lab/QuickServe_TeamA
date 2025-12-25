import { useState } from "react";
import Home from "./components/Home";
import RoleSelector from "./components/RoleSelector";
import Register from "./components/Register";
import CustomerLogin from "./components/CustomerLogin";
import ProviderLogin from "./components/ProviderLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);

  // Navigation handlers
  const openRoleSelector = () => setScreen("roleSelector");
  const openRegister = () => setScreen("register");

  const handleLoginSuccess = (user) => {
    // FIXED: Pass correct data required by dashboards
    const formattedUser = {
  userId: user.userId,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone || "",
  role: user.role,
  category: user.category || "",
  customService: user.customService || ""
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
          onLogout={() => {
            setCurrentUser(null);
            setScreen("home");
          }}
        />
      )}

    </>
  );
}
