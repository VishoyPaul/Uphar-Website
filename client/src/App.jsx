import React from 'react'
import LoginForm from './components/auth/LoginForm/LoginForm'
import Navbar from './components/common/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './about/About'
const App = () => {
  return (
    <div >
      <Navbar />
      {/* <LoginForm/> */}
      <About/>
      
    </div>
  )
}

export default App