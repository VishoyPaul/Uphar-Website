import React from 'react'
import Navbar from '../components/common/Navbar'
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import Eyewearcards from '../components/eyewearcard/Eyewearcard';
import Footer from '../components/footer/Footer';
import FadingLoader from '../components/loader/FadingLoader';
const eyewear = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-8">
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-l-lg ml-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full max-w-md" placeholder="Search eyewear..." />
        <button className="bg-pink-500 mr-2 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition">
          <IoSearch className="text-xl" />
        </button>
      </div>
      <main className='container mx-auto px-4 py-8'>
        {
          searchTerm && searchTerm.length > 0 ? (<div className='grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {searchTerm.map((item, index) => (
              <Eyewearcards key={index} {...item} />
            ))}
           
          </div>) : (
           <div className="flex justify-center items-center h-96"><FadingLoader /></div>
            
          )
        }
      </main>
      <footer>
        <Footer/>
      </footer>
      
    </div>
  )
}

export default eyewear