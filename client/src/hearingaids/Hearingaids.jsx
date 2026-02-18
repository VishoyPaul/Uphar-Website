import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import { IoSearch } from "react-icons/io5";
import Footer from '../components/footer/Footer';
import FadingLoader from '../components/loader/FadingLoader';
import Hearingfilter from '../hearingaids/Hearingfilter';
import HearingAidCard from '../components/hearingaidscard/HearingAidCard';
import { getHearingAids } from '../api/api';

const Hearingaids = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [hearingAids, setHearingAids] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getHearingAids();
      console.log('Data from API:', response);

      setHearingAids(response.data);

    } catch (error) {
      console.log('Something went wrong:', error);

    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const filteredHearingAids = hearingAids.filter((item) => {
    return (
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='relative overflow-hidden'>
      <Navbar />
      <div className="flex items-center justify-center mt-8 px-4">
        <Hearingfilter className="z-10 absolute" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-lg ml-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full max-w-md"
          placeholder="Search by brand, model, color..."
        />
        <button className="bg-pink-500 mr-2 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition">
          <IoSearch className="text-xl" />
        </button>
      </div>

      <main className='container mx-auto px-4 py-8'>


        {loading && (
          <div className="flex justify-center items-center h-96">
            <FadingLoader />
          </div>
        )}

        {!loading && filteredHearingAids.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {filteredHearingAids.map((item) => (
              <HearingAidCard
                key={item._id}
                _id={item._id}
                brand={item.brand}
                model={item.model}
                color={item.color}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        )}
        {!loading && filteredHearingAids.length === 0 && (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <p className="text-6xl">🎧</p>
            <p className="text-gray-500 text-lg font-medium">No hearing aids found</p>
            <p className="text-gray-400 text-sm">Try searching with a different keyword</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
            >
              Clear Search
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Hearingaids;
