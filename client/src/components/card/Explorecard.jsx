import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Explorecard = ({ image, title, description,path }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-3 mb-8 bg-">
      <div onClick={()=>navigate(path)}
      className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 lg:hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <h3 className="text-xl font-semibold">{title}</h3>

          <p className="text-sm opacity-90 mt-1">{description}</p>

          <div className="flex items-center mt-3 cursor-pointer">
            <span className="font-medium">View Collection</span>
            <FaArrowRight className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorecard;
