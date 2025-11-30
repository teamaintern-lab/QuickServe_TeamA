import { useState } from 'react';
import RoleSelector from './RoleSelector';
import Register from './Register';
import CustomerLogin from './CustomerLogin';
import ProviderLogin from './ProviderLogin';
import '../styles/Auth.css';

export default function AuthContainer({ onBackToHome, onLoginSuccess }) {
  const [screen, setScreen] = useState('roleSelector'); // 'roleSelector', 'customerLogin', 'providerLogin', 'register'
  const [users, setUsers] = useState([]);

  const handleRegister = (userData) => {
    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      alert('Email already registered!');
      return false;
    }
    setUsers(prev => [...prev, userData]);
    alert('Registration successful! Please login with your role.');
    setScreen('roleSelector');
    return true;
  };

  const handleLogin = (email, password, role) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid email or password!');
      return false;
    }
    if (user.role !== role) {
      alert(`This account is registered as a ${user.role}. Please use the correct login.`);
      return false;
    }
    // successful login: persist and show welcome message
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`Welcome back, ${user.username}!`);
    if (onLoginSuccess) onLoginSuccess(user);
    return true;
  };

  const handleSelectRole = (role) => {
    if (role === 'customer') setScreen('customerLogin');
    else if (role === 'provider') setScreen('providerLogin');
  };

  return (
    <div className="auth-container">
      <button className="back-to-home-btn" onClick={onBackToHome} title="Back to Home">
        ← Home
      </button>
      <div className="auth-wrapper">
        {screen === 'roleSelector' && (
          <RoleSelector
            onSelectRole={handleSelectRole}
            onRegister={() => setScreen('register')}
          />
        )}

        {screen === 'customerLogin' && (
          <CustomerLogin onLogin={handleLogin} onBack={() => setScreen('roleSelector')} />
        )}

        {screen === 'providerLogin' && (
          <ProviderLogin onLogin={handleLogin} onBack={() => setScreen('roleSelector')} />
        )}

        {screen === 'register' && (
          <>
            <Register onRegister={handleRegister} />
            <p className="toggle-text">
              Already have an account?{' '}
              <button className="toggle-btn" onClick={() => setScreen('roleSelector')}>
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
