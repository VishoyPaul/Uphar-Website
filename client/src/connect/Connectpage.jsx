import React from "react";
import { TiTickOutline } from "react-icons/ti";
import hearing from "../image/hearing.jpg";
import { useNavigate } from "react-router-dom";
const Connectpage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="bg-gradient-to-r from-[#383f91] to-[#4a2a83] px-6 py-13 lg:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

        
        <div className="w-full lg:w-1/2">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Professional Hearing Care for Everyday Life
          </h1>

          <p className="text-white/90 leading-relaxed">
            Get complete hearing support with modern diagnostics, expert
            counseling, and personalized device fitting for every age group.
          </p>

          
          <div className="flex items-start mt-6">
            <div className="bg-[#EBE0FA] rounded-full p-1">
              <TiTickOutline className="w-8 h-8 text-[#434DA6]" />
            </div>
            <div className="ml-4">
              <p className="text-white font-semibold">
                Advanced Hearing Evaluation
              </p>
              <p className="text-white/80 text-sm">
                Detailed hearing assessment with calibrated diagnostic tools.
              </p>
            </div>
          </div>

        
          <div className="flex items-start mt-6">
            <div className="bg-[#EBE0FA] rounded-full p-1">
              <TiTickOutline className="w-8 h-8 text-[#434DA6]" />
            </div>
            <div className="ml-4">
              <p className="text-white font-semibold">
                Device Fitting and Tuning
              </p>
              <p className="text-white/80 text-sm">
                Personalized fitting for clarity, comfort, and confidence.
              </p>
            </div>
          </div>

          
          <div className="mt-8"
          onClick={() => navigate('/clinic-services')}>
            <button className="bg-[#f422c7] text-[#EBE0FA] px-6 py-3 rounded-lg font-bold hover:scale-105 transition duration-300">
              Book an Appointment
            </button>
          </div>
        </div>

    
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <div className="relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={hearing}
              alt="Hearing support"
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
