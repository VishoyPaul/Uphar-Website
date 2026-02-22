import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar'
import LoginForm from '../components/auth/LoginForm/LoginForm'
import Footer from '../components/footer/Footer'
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, isLoading, user } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/';
  const isAdminUser = user?._id === 'admin-local' || user?.email === 'admin@local.dev';

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(isAdminUser ? '/admin' : redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, isAdminUser, navigate, redirectTo]);

  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow flex justify-center items-center p-10  mt-4 sm:mt-6 md:mt-10 p-4 sm:p-6 md:p-10'>
          <LoginForm redirectTo={redirectTo}/>
        </div>
        <Footer/>
    </div>
  )
}

export default LoginPage
