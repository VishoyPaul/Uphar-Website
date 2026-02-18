import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const HearingAidCard = ({ _id, image, brand, model, color, price, description }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({
      _id,
      image,
      brand,
      model,
      color,
      price,
      description,
    });
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full cursor-pointer"
      onClick={() => navigate(`/hearing-aids/${_id}`)}
    >

      <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6">

        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="absolute top-3 right-3 bg-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow"
        >
          ♡
        </button>

        <img
          src={image}
          alt={`${brand} ${model}`}
          className="mx-auto h-28 sm:h-32 md:h-36 object-contain"
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-800">
              {brand}
            </h3>
            <p className="text-xs text-gray-500">{model}</p>
          </div>
          <span className="text-indigo-600 font-bold text-sm sm:text-base">
            ₹{price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
            {color}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {description}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-3 sm:mt-4 w-full border border-indigo-500 text-indigo-600 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-600 hover:text-white transition"
        >
          <FiShoppingCart className="inline mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HearingAidCard;
