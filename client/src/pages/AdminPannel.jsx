import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'
import AdminDashCard from '../components/card/AdminDashCard'
import AdminAddItemButton from '../components/buttons/AdminAddItemButton'
import AdminDataBoard from '../components/card/AdminDataBoard'

function AdminPannel() {
  return (
    <div>
      <header><Navbar/></header>
      <main>
        <div className='mt-5 flex justify-center'>
          <AdminAddItemButton/>
        </div>
        <div className=''>
          <AdminDashCard/>
        </div>
        <AdminDataBoard/>
        
      </main>
      <footer><Footer/></footer>
    </div>
  )
}

export default AdminPannel