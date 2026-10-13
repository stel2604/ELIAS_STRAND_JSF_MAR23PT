"use client";

import { createContext, Dispatch, SetStateAction, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cart";
import { ApiProduct } from "@/types/product";

type CartContextType = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  toastMessage: string | null;
  setToastMessage: Dispatch<SetStateAction<string | null>>;
  handleAddToCart: (product: ApiProduct) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleClearItemFromCart: (productId: string) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  useEffect(() => {
  if (!toastMessage) return;

  const timer = setTimeout(() => {
    setToastMessage(null);
  }, 3000);

  return () => clearTimeout(timer);
}, [toastMessage]);

  const handleAddToCart = (product: ApiProduct) => {
    console.log("CARTCONTEXT MOTTOK:", product.title);
    
    setToastMessage(`${product.title} er lagt til i handlekurven! ✓`);
    const existingProduct = cart.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.product.id === product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
} else {
  setCart((prev) => {
    console.log("CART FØR:", prev);

    const newCart = [...prev, { product, quantity: 1 }];

    console.log("CART ETTER:", newCart);

    return newCart;
  });
}
  };

  const handleRemoveFromCart = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId);

    if (cartItem?.quantity === 1) {
      const updatedCart = cart.filter((item) => item.product.id !== productId);
      setCart(updatedCart);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleClearItemFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearItemFromCart,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}