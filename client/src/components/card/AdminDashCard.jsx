import React from 'react'
import AdminDetailCard from './AdminDetailCard'

function AdminDashCard() {
  return (
    <div className='flex flex-wrap gap-4 w-full p-4 justify-center'>
        <AdminDetailCard details='2000' title='Total Sales'/>
        <AdminDetailCard details='12' title='Pending Orders'/>
        <AdminDetailCard details='5' title='Appointments Today'/>
             
    </div>
  )
}

export default AdminDashCard