import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { TbEarScan } from "react-icons/tb";
import { BsEyeglasses } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaInfo } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GrLogin } from "react-icons/gr";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg">
      <div className="flex items-center p-4 shadow-xl rounded-4xl relative bg-gradient-to-r from-white via-pink-50  ">
        <div className="h-10 w-10 mx-2 bg-[rgb(253,50,209)] rounded-xl shadow-xl flex justify-center items-center">
          <FaEye className="text-white w-8 h-7" />
        </div>

        <span className="text-[#434DA6] text-2xl font-bold flex">
          UPHAR <span className="text-[rgb(229,15,183)] mx-1">OPTICAL</span>
        </span>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-3">
            <span onClick={() => navigate("/eye-wear")} className="nav-item ml-7 text-[#434DA6]">
              Eyewear
            </span>
            <span
              onClick={() => navigate("/hearing-aids")}
              className="nav-item ml-7 text-[#434DA6]"
            >
              Hearing Aids
            </span>
            <span
              onClick={() => navigate("/clinic-services")}
              className="nav-item ml-7 text-[#434DA6]"
            >
              Clinic Services
            </span>
            <span onClick={() => navigate("/about")} className="nav-item ml-7 text-[#434DA6]">
              About
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center">
          <FaBagShopping className="text-[#434DA6] text-2xl mx-2" />
          <RxHamburgerMenu
            className="text-[#434DA6] text-2xl mx-2 md:hidden"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>

        {isMenuOpen && (
          <div
            className="md:hidden absolute top-0 right-0 h-screen w-72 backdrop-blur-2xl bg-white shadow-xl flex flex-col gap-4 p-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-[#434DA6] text-xl font-bold mb-4">
              UPHAR <span className="text-[rgb(229,15,183)]">OPTICAL</span>
            </span>

            <MobileItem
              icon={<BsEyeglasses />}
              text="Eyewear"
              onClick={() => navigate("/eye-wear")}
            />
            <MobileItem
              icon={<TbEarScan />}
              text="Hearing Aids"
              onClick={() => navigate("/hearing-aids")}
            />
            <MobileItem
              icon={<RiCustomerService2Line />}
              text="Clinic Services"
              onClick={() => navigate("/clinic-services")}
            />
            <MobileItem
              icon={<FaInfo />}
              text="About"
              onClick={() => navigate("/about")}
            />
            <MobileItem
              icon={<GrLogin />}
              text="Login"
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MobileItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-2 text-[#434DA6] hover:bg-[#2435c98e] rounded-lg"
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default Navbar;
