import CartCard from "../components/checkout/CartCard";
import BillCard from "../components/checkout/BillCard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/footer/Footer";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 499 : 0;
  const discount = 0;

  return (
    <>
    <header><Navbar/></header>
    
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CartCard
          cartItems={cartItems}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
        />
        <BillCard subtotal={subtotal} shipping={shipping} discount={discount} />
      </div>
    </div>

    <footer><Footer/></footer>
    </>
    );
};

export default CartPage;
