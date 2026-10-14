"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ApiProduct } from "@/types/product";

type AddToCartButtonProps = {
  product: ApiProduct;
};
export default function AddToCartButton({ product }: AddToCartButtonProps) {
  
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext mangler");
    }
  
  const { cart, handleAddToCart, handleRemoveFromCart, handleClearItemFromCart,} = cartContext;

  const quantity =
    cart.find((item) => item.product.id === product.id)?.quantity ?? 0;

return (
  <>
    {quantity === 0 ? (
      <button
        className="addOnCart"
        onClick={() => handleAddToCart(product)}
      >
        Legg i handlekurv
      </button>
    ) : (
      <div className="quantityControls">
        <button
          className="removeButton"
          onClick={() => handleRemoveFromCart(product.id)}
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          className="addButton"
          onClick={() => handleAddToCart(product)}
        >
          +
        </button>
      </div>
    )}
          {quantity > 1 && (
        <button
          className="removeAll"
          onClick={() => handleClearItemFromCart(product.id)}
        >
          Fjern fra handlekurv
        </button>
      )}
  </>
);

}

