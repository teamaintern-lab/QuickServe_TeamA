import { useState } from 'react';
import RoleSelector from './RoleSelector';
import Register from './Register';
import CustomerLogin from './CustomerLogin';
import ProviderLogin from './ProviderLogin';
import '../styles/Auth.css';

export default function AuthContainer() {
  const [screen, setScreen] = useState('roleSelector'); // 'roleSelector', 'customerLogin', 'providerLogin', 'register'
  const [users, setUsers] = useState([]);

  const handleRegister = (userData) => {
    // Check if user already exists
    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      alert('Email already registered!');
      return false;
    }
    // Add new user
    setUsers([...users, userData]);
    alert('Registration successful! Please login with your role.');
    setScreen('roleSelector');
    return true;
  };

  const handleLogin = (email, password, role) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      if (user.role !== role) {
        alert(`This account is registered as a ${user.role}. Please use the correct login.`);
        return false;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome back, ${user.username}!`);
      return true;
    } else {
      alert('Invalid email or password!');
      return false;
    }
  };

  const handleSelectRole = (role) => {
    if (role === 'customer') {
      setScreen('customerLogin');
    } else if (role === 'provider') {
      setScreen('providerLogin');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {screen === 'roleSelector' && (
          <RoleSelector
            onSelectRole={handleSelectRole}
            onRegister={() => setScreen('register')}
          />
        )}
        {screen === 'customerLogin' && (
          <CustomerLogin
            onLogin={handleLogin}
            onBack={() => setScreen('roleSelector')}
          />
        )}
        {screen === 'providerLogin' && (
          <ProviderLogin
            onLogin={handleLogin}
            onBack={() => setScreen('roleSelector')}
          />
        )}
        {screen === 'register' && (
          <>
            <Register onRegister={handleRegister} />
            <p className="toggle-text">
              Already have an account?{' '}
              <button
                className="toggle-btn"
                onClick={() => setScreen('roleSelector')}
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
