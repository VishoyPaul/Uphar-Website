import React, { useEffect, useMemo, useState } from 'react';
import CartContext from './cartContextValue';

const CART_STORAGE_KEY = 'uphar_cart_items';

const readCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product?._id) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    cartCount,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
