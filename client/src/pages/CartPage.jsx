import CartCard from "../components/checkout/CartCard";
import BillCard from "../components/checkout/BillCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/footer/Footer";
import useCart from "../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";

const CartPage = () => {
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const isCheckoutPage = location.pathname === "/checkout";

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 499 : 0;
  const discount = 0;

  const handleIncrement = (id) => {
    incrementItem(id);
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((cartItem) => cartItem._id === id);
    decrementItem(id);

    if (item?.quantity === 1) {
      showAlert({
        type: 'info',
        title: 'Item removed',
        message: `${item.brand} ${item.model} was removed from cart.`,
      });
    }
  };

  const handleRemove = (id) => {
    const item = cartItems.find((cartItem) => cartItem._id === id);
    removeItem(id);
    if (item) {
      showAlert({
        type: 'info',
        title: 'Item removed',
        message: `${item.brand} ${item.model} was removed from cart.`,
      });
    }
  };

  return (
    <>
    <header><Navbar/></header>
    
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
        {isCheckoutPage ? "Checkout" : "Your Cart"}
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CartCard
          cartItems={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
        />
        <BillCard
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          actionLabel={isCheckoutPage ? "Place Order" : "Proceed to Checkout"}
          actionDisabled={cartItems.length === 0}
          onActionClick={() => {
            if (isCheckoutPage) {
              showAlert({
                type: 'success',
                title: 'Order placed',
                message: 'Your order has been placed successfully.',
              });
              return;
            }
            showAlert({
              type: 'info',
              title: 'Checkout started',
              message: 'Please complete payment details to place your order.',
            });
            navigate("/checkout");
          }}
        />
      </div>
    </div>

    <footer><Footer/></footer>
    </>
    );
};

export default CartPage;
