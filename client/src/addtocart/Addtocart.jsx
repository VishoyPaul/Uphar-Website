import React from "react";
import Navbar from "../components/common/Navbar";
import FadingLoader from "../components/loader/FadingLoader";
import Footer from "../components/footer/Footer";
const Addtocart = () => {
  const [cartItems] = React.useState([]);
  return (
    <div>
      <Navbar />
      <div>
        {cartItems && cartItems.length > 0 ? (
          <>
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            <FadingLoader />
          </div>
        )}
      </div>
      <footer>
        <Footer
          bgcolor={"bg-[#434DA6]"}
          textcolor={"text-white"}
          othercolor="text-[#FCA1E8]"
        />
      </footer>
    </div>
  );
};

export default Addtocart;
