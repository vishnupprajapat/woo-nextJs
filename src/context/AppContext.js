"use client";

import React, { useState, useEffect, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("woo-next-cart");
      setCart(cartData ? JSON.parse(cartData) : null);
    }
  }, []);

  return (
    <AppContext.Provider value={[ cart, setCart ]}>
      {children}
    </AppContext.Provider>
  );
};
