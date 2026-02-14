import React from "react";
import Explorecard from "../components/card/Explorecard";
import frames from "../image/frames.jpg";
import hearing from "../image/hearing.jpg";
import sungoggles from "../image/sungoggles.jpg";

const Explorepage = () => {
  const exploreData = [
    {
      image: frames,
      title: "Designer Frames",
      description:
        "Curated collection of stylish and trendy frames to elevate your eyewear game.",
      path:"/eye-wear",
    },
    {
      image: hearing,
      title: "Digital Hearing Aids",
      description:
        "Advanced hearing aids with digital sound processing for enhanced clarity and comfort.",
      path:"/hearing-aids",
    },
    {
      image: sungoggles,
      title: "Smart Glasses",
      description:
        "Innovative smart glasses with integrated features for seamless connectivity and augmented reality experiences.",
      path:"/smart-glasses",
    },
  ];

  return (
    <section className="bg-[#EBE0FA] py-16">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#724af4] inline-block relative">
          Explore Our Collections
          <span className="block w-20 h-1 bg-[#724af4] mx-auto mt-4 rounded-full"></span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover premium eyewear and advanced hearing solutions designed for
          clarity, comfort, and style.
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {exploreData.map((item, index) => (
          <Explorecard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            path={item.path}
          />
        ))}
      </div>
    </section>
  );
};

export default Explorepage;
