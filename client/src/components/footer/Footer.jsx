import React from "react";
import { FaFacebookF, FaInstagram, FaAt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Footer = ({
  bgcolor = "bg-white",
  textcolor = "text-gray-800",
  othercolor = "text-gray-500",
}) => {
  return (
    <footer className={`${bgcolor} px-6 md:px-16 pt-16`}>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        
        <div>
          <img
            src="/icons/logo.png"
            alt="Uphar Optical logo"
            className="h-12 w-auto object-contain"
          />
          <p className={`mt-4 text-sm ${othercolor}`}>
            Providing premium optical and hearing solutions since 1995.
            Your senses, our priority.
          </p>

          <div className="flex gap-3 mt-6">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border">
              <FaFacebookF />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border">
              <FaInstagram />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border">
              <FaAt />
            </div>
          </div>
        </div>

        
        <div>
          <h3 className={`font-semibold mb-4 ${textcolor}`}>Shop</h3>
          <ul className={`space-y-2 text-sm ${othercolor}`}>
            <li>Men's Eyewear</li>
            <li>Women's Eyewear</li>
            <li>Hearing Aids</li>
            <li>Accessories</li>
          </ul>
        </div>

        
        <div>
          <h3 className={`font-semibold mb-4 ${textcolor}`}>Clinic</h3>
          <ul className={`space-y-2 text-sm ${othercolor}`}>
            <li>Eye Exams</li>
            <li>Hearing Test</li>
            <li>Contact Lens Fitting</li>
            <li>Locations</li>
          </ul>
        </div>

        
        <div>
          <h3 className={`font-semibold mb-4 ${textcolor}`}>Newsletter</h3>
          <p className={`text-sm mb-4 ${othercolor}`}>
            Stay updated with our latest collections and wellness tips.
          </p>
        </div>
      </div>

    
      <div className="border-t mt-14"></div>

      
      <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm">
        <p className={othercolor}>
          © 2024 Uphar Optical and Hearing Aid Clinic. All rights reserved.
        </p>

        <div className={`flex gap-4 mt-2 md:mt-0 ${othercolor}`}>
          <span className="cursor-pointer">Privacy Policy</span>
          <span className="cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
