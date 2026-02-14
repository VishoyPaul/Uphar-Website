import React from 'react'
import SignupForm from '../components/auth/SignupForm/SignupForm'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'

const SignupPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center p-10  mt-4 sm:mt-6 md:mt-10 p-4 sm:p-6 md:p-10'>
          <SignupForm/>
        </div>
        <Footer/>
    </div>
  )
}

export default SignupPage