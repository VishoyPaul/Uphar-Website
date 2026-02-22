import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './about/About'
import Connectpagesec from './connect/Connectpagesec'
import Eyewear from './eyewear/Eyewear'
import HearingAids from './hearingaids/Hearingaids'
import Loginpage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminPannel from './pages/AdminPannel'
import CartPage from './pages/CartPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'
import useAuth from './hooks/useAuth'
import FadingLoader from './components/loader/FadingLoader'

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FadingLoader />
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Routes>
        <Route path='/eye-wear' element={<Eyewear/>}/>
        <Route path='/hearing-aids' element={<HearingAids/>}/>
        <Route path='/hearing-aids/:id' element={<ProductDetailsPage/>}/>
        <Route path='/clinic-services' element={<Connectpagesec/>}/>
        <Route path='/add-to-cart' element={<CartPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/' element={<About/>}/>
        <Route
          path='/admin'
          element={(
            <ProtectedRoute>
              <AdminPannel/>
            </ProtectedRoute>
          )}
        />
        <Route
          path='/checkout'
          element={(
            <ProtectedRoute>
              <CartPage/>
            </ProtectedRoute>
          )}
        />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
