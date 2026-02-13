import React from 'react'
import Explorepage from '../explore/Explorepage'
import  Connectpage  from '../connect/Connectpage'
import Footer from '../components/footer/Footer'
import Frontpage from '../front/Frontpage'
const About = () => {
  return (
    <div>
      <Frontpage/>
      <Explorepage/>
      <Connectpage/>
      <Footer/>
    </div>
  )
}

export default About