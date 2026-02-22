import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/footer/Footer'
import AdminDashCard from '../components/card/AdminDashCard'
import AdminAddItemButton from '../components/buttons/AdminAddItemButton'
import AdminDataBoard from '../components/card/AdminDataBoard'
import AdminAppointmentsBoard from '../components/card/AdminAppointmentsBoard'

function AdminPannel() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <header><Navbar/></header>
      <main>
        <div className='mt-5 flex justify-center'>
          <AdminAddItemButton onCreated={handleCreated}/>
        </div>
        <div className=''>
          <AdminDashCard refreshKey={refreshKey}/>
        </div>
        <AdminDataBoard refreshKey={refreshKey} onChanged={handleCreated}/>
        <AdminAppointmentsBoard refreshKey={refreshKey}/>
        
      </main>
      <footer><Footer/></footer>
    </div>
  )
}

export default AdminPannel
