import { useState } from 'react'
import Home from './components/Home'
import AuthContainer from './components/AuthContainer'
import CustomerDashboard from './components/CustomerDashboard'
import ProviderDashboard from './components/ProviderDashboard'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'auth', 'customer-dashboard', 'provider-dashboard'
  const [currentUser, setCurrentUser] = useState(null)

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    if (user.role === 'customer') {
      setCurrentPage('customer-dashboard')
    } else if (user.role === 'provider') {
      setCurrentPage('provider-dashboard')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    setCurrentPage('home')
  }

  return (
    <>
      {currentPage === 'home' ? (
        <Home onLogin={() => setCurrentPage('auth')} />
      ) : currentPage === 'auth' ? (
        <AuthContainer onBackToHome={() => setCurrentPage('home')} onLoginSuccess={handleLoginSuccess} />
      ) : currentPage === 'customer-dashboard' && currentUser ? (
        <CustomerDashboard user={currentUser} onLogout={handleLogout} />
      ) : currentPage === 'provider-dashboard' && currentUser ? (
        <ProviderDashboard user={currentUser} onLogout={handleLogout} />
      ) : null}
    </>
  )
}

export default App
