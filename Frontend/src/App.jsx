import { useEffect, useState } from 'react'
import AuthContainer from './components/AuthContainer'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAuthenticated = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  return currentUser ? (
    <Dashboard user={currentUser} onLogout={handleLogout} />
  ) : (
    <AuthContainer onAuthenticated={handleAuthenticated} />
  )
}

export default App
