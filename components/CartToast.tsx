"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function CartToast() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { toastMessage } = cartContext;

  if (!toastMessage) {
    return null;
  }

  return (
    <div className="globalToast" role="status" aria-live="polite">
      {toastMessage}
    </div>
  );
}