import React from "react";
import { useNavigate } from "react-router-dom";
const Frontpage = () => {
  const heroImage = "/device_png.png";
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#fff4fb] via-[#fdf8ff] to-[#efeaff]">
      <div className="max-w-7xl mx-auto min-h-screen px-6 md:px-12 flex items-center">


        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        
          <div className="flex flex-col justify-center text-center lg:text-left">
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold text-pink-500 bg-pink-100 self-center lg:self-start">
              ADVANCED HEARING CARE
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Hear Clearly. <br />
              Live Confidently. <br />
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Live Fully.
              </span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-xl mx-auto lg:mx-0">
              Discover digital hearing aids built for daily comfort, speech
              clarity, and smart connectivity. Get clinic-level support with
              modern, lifestyle-friendly hearing solutions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => navigate('/hearing-aids')} className="px-6 py-3 rounded-full bg-white text-gray-800 font-semibold border hover:scale-105 transition">
                Explore Hearing Aids
              </button>
              <button onClick={() => navigate('/clinic-services')} className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:scale-105 transition">
                Book Hearing Test
              </button>
            </div>
          </div>

          
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-pink-100">
              <img
                src={heroImage}
                alt="Hearing aid showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Frontpage;
