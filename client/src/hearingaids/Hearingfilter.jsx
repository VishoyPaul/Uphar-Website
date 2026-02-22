import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

const FILTER_DATA = {
  brand: ["RayBan", "Titan", "Fastrack", "Vincent Chase"],
  color: ["Black", "Blue", "Red", "Brown"],
  shape: ["Round", "Rectangle", "Square", "Aviator"],
  gender: ["Men", "Women", "Unisex"],
};
const renderFilterOptions = (type) => {
  switch (type) {
    case "brand":
      return (
        <>
          <h3 className="font-semibold mb-3">Brand</h3>
          {["RayBan", "Titan", "Fastrack"].map((brand) => (
            <label key={brand} className="flex items-center gap-2 mb-2">
              <input type="checkbox" />
              {brand}
            </label>
          ))}
        </>
      );

    case "color":
      return (
        <>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex gap-3">
            {["black", "blue", "red", "brown"].map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full border cursor-pointer bg-${color}-500`}
              />
            ))}
          </div>
        </>
      );

    case "shape":
      return (
        <>
          <h3 className="font-semibold mb-3">Shape</h3>
          {["Round", "Rectangle", "Square"].map((shape) => (
            <button
              key={shape}
              className="block w-full border px-3 py-1 mb-2 rounded"
            >
              {shape}
            </button>
          ))}
        </>
      );

    case "gender":
      return (
        <>
          <h3 className="font-semibold mb-3">Gender</h3>
          {["Men", "Women", "Unisex"].map((g) => (
            <label key={g} className="flex items-center gap-2 mb-2">
              <input type="radio" name="gender" />
              {g}
            </label>
          ))}
        </>
      );

    default:
      return null;
  }
};

const Hearingfilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("brand");

  return (
    <>
      <FiFilter
        onClick={() => setIsOpen(true)}
        className="w-8 ml-3 h-8 cursor-pointer"
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Content */}
        <div className="flex h-full">
          {/* Left Menu */}
          <ul className="w-1/3 border-r p-2 space-y-3">
            {Object.keys(FILTER_DATA).map((item) => (
              <li
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`cursor-pointer capitalize ${
                  activeFilter === item ? "font-bold text-pink-500" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Right Options */}
          <div className="w-2/3 p-4">
            {renderFilterOptions(activeFilter)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hearingfilter;
