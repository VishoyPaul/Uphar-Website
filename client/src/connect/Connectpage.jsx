import React from "react";
import { TiTickOutline } from "react-icons/ti";
import frames from "../image/frames.jpg";

const Connectpage = () => {
  return (
    <>
    <div className="bg-[#434DA6] px-6 py-13 lg:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

        
        <div className="w-full lg:w-1/2">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Professional Care for Your Senses
          </h1>

          <p className="text-white/90 leading-relaxed">
            Our clinic is equipped with the latest diagnostic technology for both
            vision and hearing health — from pediatric screenings to advanced
            geriatric care.
          </p>

          
          <div className="flex items-start mt-6">
            <div className="bg-[#EBE0FA] rounded-full p-1">
              <TiTickOutline className="w-8 h-8 text-[#434DA6]" />
            </div>
            <div className="ml-4">
              <p className="text-white font-semibold">
                Comprehensive Eye Exams
              </p>
              <p className="text-white/80 text-sm">
                Detailed vision analysis using modern diagnostic tools.
              </p>
            </div>
          </div>

        
          <div className="flex items-start mt-6">
            <div className="bg-[#EBE0FA] rounded-full p-1">
              <TiTickOutline className="w-8 h-8 text-[#434DA6]" />
            </div>
            <div className="ml-4">
              <p className="text-white font-semibold">
                Audiometric Testing
              </p>
              <p className="text-white/80 text-sm">
                Accurate hearing tests for all age groups.
              </p>
            </div>
          </div>

          
          <div className="mt-8">
            <button className="bg-[#f422c7] text-[#EBE0FA] px-6 py-3 rounded-lg font-bold hover:scale-105 transition duration-300">
              Book an Appointment
            </button>
          </div>
        </div>

    
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <div className="relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={frames}
              alt="Frames"
              className="w-full h-full object-cover"
            />

    
            <div className="absolute inset-0 bg-gradient-to-r from-[#434DA6]/70 via-[#434DA6]/40 to-transparent" />
          </div>
        </div>

      </div>
    </div>
    
    </>
  );
};

export default Connectpage;
