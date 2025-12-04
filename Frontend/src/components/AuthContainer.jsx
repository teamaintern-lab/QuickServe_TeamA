import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../styles/Auth.css';

export default function AuthContainer({ onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);

  const handleRegister = (userData) => {
    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      alert('Email already registered!');
      return false;
    }
    setUsers(prev => [...prev, userData]);
    alert('Registration successful! Please login.');
    setIsLogin(true);
    return true;
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome back, ${user.username}!`);
      if (onAuthenticated) {
        onAuthenticated(user);
      }
      return true;
    }
    alert('Invalid email or password!');
    return false;
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {isLogin ? (
          <>
            <Login onLogin={handleLogin} />
            <p className="toggle-text">
              Don't have an account?{' '}
              <button
                className="toggle-btn"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <p className="toggle-text">
              Already have an account?{' '}
              <button
                className="toggle-btn"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
