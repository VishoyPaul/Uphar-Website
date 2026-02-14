import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './about/About'
import Connectpagesec from './connect/Connectpagesec'
import Eyewear from './eyewear/Eyewear'
import HearingAids from './hearingaids/Hearingaids'
import Addtocart from './addtocart/Addtocart'
import Loginpage from './components/auth/LoginForm/LoginForm'

const App = () => {
  return (
   <>
   <Routes>

    <Route path='/eye-wear' element={<Eyewear/>}/>
    <Route path='/hearing-aids' element={<HearingAids/>}/>
    <Route path='clinic-services' element={<Connectpagesec/>}/>
    <Route path='/add-to-cart' element={<Addtocart/>}/>
    <Route path='/login-form' element={<Loginpage/>}/>
    <Route path='/' element={<About/>}/>
   </Routes>
   </>
  )
}

export default App