import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'
import Connectform from "../connect/Connectform"
import AppointmentStatusTracker from './AppointmentStatusTracker'
const Connectpagesec = () => {
  return (
    <div>
      <Navbar />
      <Connectform />
      <AppointmentStatusTracker />
      <Footer/>
    </div>
  )
}

export default Connectpagesec
