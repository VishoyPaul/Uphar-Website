import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbEarScan } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaInfo } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import logoImage from "../../image/logo.png";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { showAlert } = useAlert();

  const handleAuthAction = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await logout();
    showAlert({
      type: 'success',
      title: 'Logged out',
      message: 'You have logged out successfully.',
    });
    navigate("/");
  };

  return (
    <div className="w-full bg">
      <div className="flex items-center p-4 shadow-xl relative bg-gradient-to-r from-white via-pink-50  ">
        <a href="/" className="mx-2 flex items-center">
          <img
            src={logoImage}
            alt="Uphar Optical logo"
            className="h-14 w-14 object-contain"
          />
        </a>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-3">
            {/* <span onClick={() => navigate("/eye-wear")} className="nav-item ml-7 text-[#434DA6]">
              Eyewear
            </span> */}
            <span
              onClick={() => navigate("/hearing-aids")}
              className="nav-item ml-7 text-[#434DA6]"
            >
              Products
            </span>
            <span
              onClick={() => navigate("/clinic-services")}
              className="nav-item ml-7 text-[#434DA6]"
            >
              Clinic-Services
            </span>
            <span onClick={() => navigate("/")} className="nav-item ml-7 text-[#434DA6]">
              About
            </span>
            <span onClick={handleAuthAction} className="nav-item ml-7 text-[#434DA6]">
              {isAuthenticated ? "Logout" : "Login"}
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center relative">
          <FaBagShopping className="text-[#434DA6] text-2xl mx-2 cursor-pointer" onClick={()=>navigate("/cart")}/>
          {cartCount > 0 ? (
            <span className="absolute -top-1 left-5 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-[11px] font-semibold flex items-center justify-center">
              {cartCount}
            </span>
          ) : null}
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
            <img
              src={logoImage}
              alt="Uphar Optical logo"
              className="mb-4 h-12 w-12 object-contain"
            />

            {/* <MobileItem
              icon={<BsEyeglasses />}
              text="Eyewear"
              onClick={() => navigate("/eye-wear")}
            /> */}
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
              onClick={() => navigate("/")}
            />
            <MobileItem
              icon={<GrLogin />}
              text={isAuthenticated ? "Logout" : "Login"}
              onClick={handleAuthAction}
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
