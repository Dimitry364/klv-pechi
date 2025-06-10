'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');

    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, option) => {
    const stored = localStorage.getItem('cart');
    const currentCart = stored ? JSON.parse(stored) : [];

    const updated = [...currentCart, { product, option }];
    setCart(updated);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        added,
        addToCart,
        removeFromCart,
        clearCart,
        setAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
