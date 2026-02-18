import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './about/About'
import Connectform from './connect/Connectform'
import Eyewear from './eyewear/Eyewear'
import HearingAids from './hearingaids/Hearingaids'
import AboutUs from './about/AboutUs'
import ContactUs from '../src/pages/contactpage.jsx'


const App = () => {
  return (
   <>
   <Routes>

    <Route path='/eye-wear' element={<Eyewear/>}/>
    <Route path='/hearing-aids' element={<HearingAids/>}/>
    <Route path='clinic-services' element={<Connectform/>}/>
    <Route path='/' element={<About/>}/>
    <Route path='/AboutUs' element={<AboutUs/>}/>
    <Route path='/ContactUs' element={<ContactUs/>}/>
   </Routes>
   </>
  )
}

export default App