import React from 'react'
import Navbar from '../components/common/Navbar'
import LoginForm from '../components/auth/LoginForm/LoginForm'
import Footer from '../components/footer/Footer'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center p-10  mt-4 sm:mt-6 md:mt-10 p-4 sm:p-6 md:p-10'>
          <LoginForm/>
        </div>
        <Footer/>
    </div>
  )
}

export default LoginPage