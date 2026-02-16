import React from 'react'

function AdminAddItemButton() {
  return (
    <div>
        <button className='bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2'>
  <span className='text-xl'>+</span>
  Add Items
</button>
    </div>
  )
}

export default AdminAddItemButton