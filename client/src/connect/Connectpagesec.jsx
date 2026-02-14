import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'
import Connectform from "../connect/Connectform"
const Connectpagesec = () => {
  return (
    <div>
      <Navbar />
      <Connectform />
      <Footer bgcolor='bg-[#83C0EE]' othercolor='text-[#EBE0FA]' />
    </div>
  )
}

export default Connectpagesec