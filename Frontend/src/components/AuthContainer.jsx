import { useState, useEffect } from "react";
import RoleSelector from "./RoleSelector";
import Register from "./Register";
import CustomerLogin from "./CustomerLogin";
import ProviderLogin from "./ProviderLogin";
import "../styles/Auth.css";

import { login, signup } from "../services/api";
import { setCurrentUser } from "../services/session";

export default function AuthContainer({ onBackToHome, onLoginSuccess, openRegister = false }) {
  
  const [screen, setScreen] = useState("roleSelector");

  // If openRegister=true => open Register screen automatically
  useEffect(() => {
    if (openRegister) {
      setScreen("register");
    }
  }, [openRegister]);

  // SIGNUP HANDLER
  const handleRegister = async (data) => {
    try {
      const res = await signup({
        fullName: data.username,
        email: data.email,
        password: data.password,
        role: data.role.toUpperCase(),
        category: data.category,
        customService: data.customService,
        experience: data.experience
      });

      if (res.data.success) {
        alert("Registration successful! Please login.");
        setScreen("roleSelector");
        return true;
      }

      alert(res.data.message || "Signup failed");
      return false;
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
      return false;
    }
  };

  // LOGIN HANDLER
  const handleLogin = async (email, password, roleRequested) => {
    try {
      const res = await login({ email, password });

      if (!res.data.success) {
        alert("Invalid email or password!");
        return false;
      }

      const backendRole = res.data.role;

      if (roleRequested === "provider" && backendRole !== "PROVIDER") {
        alert("This account is not a provider account.");
        return false;
      }
      if (roleRequested === "customer" && backendRole !== "CUSTOMER") {
        alert("This account is not a customer account.");
        return false;
      }

      const user = {
        userId: res.data.userId,
        fullName: res.data.fullName,
        role: backendRole
      };

      setCurrentUser(user);

      if (onLoginSuccess) onLoginSuccess(user);

      alert(`Welcome back, ${user.fullName}!`);
      return true;

    } catch (err) {
      console.error(err);
      alert("Login failed.");
      return false;
    }
  };

  // ROLE SELECTION HANDLER
  const handleSelectRole = (role) => {
    if (role === "customer") setScreen("customerLogin");
    if (role === "provider") setScreen("providerLogin");
  };

  return (
    <div className="auth-container">
      <button className="back-to-home-btn" onClick={onBackToHome}>
        ← Home
      </button>

      <div className="auth-wrapper">

        {screen === "roleSelector" && (
          <RoleSelector
            onSelectRole={handleSelectRole}
            onRegister={() => setScreen("register")}
          />
        )}

        {screen === "customerLogin" && (
          <CustomerLogin
            onLogin={handleLogin}
            onBack={() => setScreen("roleSelector")}
          />
        )}

        {screen === "providerLogin" && (
          <ProviderLogin
            onLogin={handleLogin}
            onBack={() => setScreen("roleSelector")}
          />
        )}

        {screen === "register" && (
          <>
            <Register onRegister={handleRegister} />
            <p className="toggle-text">
              Already have an account?{" "}
              <button className="toggle-btn" onClick={() => setScreen("roleSelector")}>
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
