"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// تعریف ساختار محصول در سبد خرید
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  increaseQuantity: (id: string, size: string, color: string) => void;
  decreaseQuantity: (id: string, size: string, color: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // بارگذاری سبد خرید از LocalStorage در ابتدای کار
  useEffect(() => {
    const savedCart = localStorage.getItem("narciss_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ذخیره در LocalStorage با هر تغییر
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("narciss_cart", JSON.stringify(newCart));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === newItem.id &&
        item.size === newItem.size &&
        item.color === newItem.color
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...newItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    saveCart(updatedCart);
  };

  const increaseQuantity = (id: string, size: string, color: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCart(updatedCart);
  };

  const decreaseQuantity = (id: string, size: string, color: string) => {
    const existingItem = cart.find(
      (item) => item.id === id && item.size === size && item.color === color
    );

    if (existingItem && existingItem.quantity === 1) {
      removeFromCart(id, size, color);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      saveCart(updatedCart);
    }
  };

  const clearCart = () => saveCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return context;
}
