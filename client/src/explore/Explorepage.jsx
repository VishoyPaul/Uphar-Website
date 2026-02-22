import React from "react";
import Explorecard from "../components/card/Explorecard";
import hearing from "../image/hearing.jpg";
import frames from "../image/frames.jpg";
import sungoggles from "../image/sungoggles.jpg";

const Explorepage = () => {
  const exploreData = [
    {
      image: hearing,
      title: "Rechargeable Hearing Aids",
      description:
        "Latest digital hearing aids with better voice focus, low-noise processing, and comfortable daily fit.",
      path:"/hearing-aids",
    },
    {
      image: sungoggles,
      title: "Bluetooth Hearing Devices",
      description:
        "Stay connected with hearing devices that support calling and media streaming for modern lifestyles.",
      path:"/hearing-aids",
    },
    {
      image: frames,
      title: "Clinic Hearing Support",
      description:
        "End-to-end hearing care including fitting, tuning, counseling, and aftercare by trained experts.",
      path:"/clinic-services",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#fdf4ff] to-[#f5ecff] py-16">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5d35b3] inline-block relative">
          Explore Hearing Solutions
          <span className="block w-20 h-1 bg-[#5d35b3] mx-auto mt-4 rounded-full"></span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Find the right hearing solution with advanced technology, trusted
          fitting support, and clinic-backed guidance.
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
