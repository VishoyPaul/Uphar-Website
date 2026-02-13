import React from 'react'
import LoginForm from './components/auth/LoginForm/LoginForm'
import Navbar from './components/common/Navbar'
const App = () => {
  return (
    <div class="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-b from-[#FCA1E8] to-white">
      <LoginForm/>
    </div>
  )
}

export default App