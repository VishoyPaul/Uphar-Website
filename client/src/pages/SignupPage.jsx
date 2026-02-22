import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm/SignupForm'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'
import useAuth from '../hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center p-10  mt-4 sm:mt-6 md:mt-10 p-4 sm:p-6 md:p-10'>
          <SignupForm redirectTo={redirectTo}/>
        </div>
        <Footer/>
    </div>
  )
}

export default SignupPage
