import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const EyewearCard = ({ image, name, price, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      
      <div className="relative bg-black p-5 sm:p-6">

        <button className="absolute top-3 right-3 bg-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow">
          ♡
        </button>

        <img
          src={image}
          alt={name}
          className="mx-auto h-28 sm:h-32 md:h-36 object-contain"
        />
      </div>

  
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-sm sm:text-base font-semibold">
            {name}
          </h3>
          <span className="text-indigo-600 font-bold text-sm sm:text-base">
            ${price}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-1 uppercase">
          {description}
        </p>

        <button className="mt-3 sm:mt-4 w-full border border-indigo-500 text-indigo-600 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-600 hover:text-white transition">
          <FiShoppingCart className="inline mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
export default EyewearCard;