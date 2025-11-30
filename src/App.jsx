import { useState } from 'react'
import Home from './components/Home'
import AuthContainer from './components/AuthContainer'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home' or 'auth'

  return (
    <>
      {currentPage === 'home' ? (
        <Home onLogin={() => setCurrentPage('auth')} />
      ) : currentPage === 'auth' ? (
        <AuthContainer onBackToHome={() => setCurrentPage('home')} />
      ) : null}
    </>
  )
}

export default App
