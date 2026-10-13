"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { ApiProduct } from "@/types/product";

type AddToCartButtonProps = {
  product: ApiProduct;
};
export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [showToast, setShowToast] = useState(false);
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext mangler");
    }
    const { handleAddToCart } = cartContext;

return (
  <>
    <button
      className="addOnCart"
      onClick={() => {
        console.log("KLIKK FUNGERER:", product);
        handleAddToCart(product);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }}
    >
      Legg i handlekurv
    </button>

    {showToast && (
      <p>Lagt i handlekurven! ✓</p>
    )}
  </>
);

}

