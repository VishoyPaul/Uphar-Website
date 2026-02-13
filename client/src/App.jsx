import React from 'react'
import LoginForm from './components/auth/LoginForm/LoginForm'
import Navbar from './components/common/Navbar'

const App = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-[#FCA1E8] to-white">
      {/* Fixed Navbar at top */}
      <header className="fixed top-0 left-0 right-0 w-full">
        <Navbar />
      </header>
      
      {/* Main content with padding top to account for fixed navbar */}
      <main className="flex items-center justify-center min-h-screen pt-20">
        <LoginForm />
      </main>
    </div>
  )
}

export default App