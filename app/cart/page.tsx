"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import {useRouter} from "next/navigation";



export default function CartPage() {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) {
    throw new Error("CartContext mangler");
  }



  // Hent funksjonene fra konteksten din
  const { cart, handleAddToCart, handleRemoveFromCart, handleClearItemFromCart } = cartContext;

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cart.reduce(
  (sum, item) => sum + item.product.discountedPrice * item.quantity,
  0
);

const originalTotal = cart.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);


const totalDiscount = originalTotal - totalPrice;

  const handleCheckout = () => {
    router.push("/checkout");
  }

  


  return (
    <main className="cartPage">
      <h1>Din Handlekurv</h1>

      {cart.length === 0 ? (
        <div className="emptyCart">
          <p>Din handlekurv er tom.</p>
          <Link href="/" className="continueShoppingButton">
            Gå til butikken
          </Link>
        </div>
      ) : (
        <div className="cartLayout">
          <div className="cartList">
            {cart.map((cartItem) => {
               const hasDiscount =
              cartItem.product.discountedPrice < cartItem.product.price;
              return (
                <div key={cartItem.product.id} className="cartRow">
                  {cartItem.product.image?.url && (
                    <Link href={`/product/${cartItem.product.id}`}>
                      <img
                        src={cartItem.product.image.url}
                        alt={cartItem.product.title}
                        className="cartRowImage"
                      />
                    </Link>
                  )}

              <div className="cartRowDetails">
                <Link href={`/product/${cartItem.product.id}`}>
                  <h2>{cartItem.product.title}</h2>
                </Link>

                {hasDiscount ? (
                  <>
                    <p className="oldPrice">Før: {cartItem.product.price} kr</p>
                    <p className="discountedPrice">Nå: {cartItem.product.discountedPrice} kr</p>
                  </>
                ) : (
                  <p>{cartItem.product.price} kr</p>
                )}
              </div>

                {/* Kolonnen for antall og knapper */}
                <div className="cartRowQuantity">
                  <span>Antall: {cartItem.quantity}</span>
                  
                  {/* Knappene legges rett under */}
                  <div className="cartQuantityControls">
                    <button 
                      className="removeButton"
                      onClick={() => handleRemoveFromCart(cartItem.product.id)}
                    >
                      -
                    </button>


                    <button 
                      className="addButton"
                      onClick={() => handleAddToCart(cartItem.product)}
                    >
                      +
                    </button>

                    <button 
                      className="removeAll"
                      onClick={() => {
                        console.log("Fjerner varen fra handlekurven", cartItem.product);
                        handleClearItemFromCart(cartItem.product.id);
                      }}    
                    >
                      Fjern
                    </button>
                  </div>
                </div>

              <div className="cartRowSubtotal">
                <p>{(cartItem.product.discountedPrice * cartItem.quantity).toFixed(2)} kr</p>
              </div>
              </div>
              );
              })}
              </div>


          <div className="cartSummary">
            <h2>Sammendrag</h2>
            <div className="summaryRow">
              <span>Totalt antall varer:</span>
              <span>{totalItems}</span>
            </div>

            <div className="summaryRow">
              <span>Varer før rabatt:</span>
              <span>{originalTotal.toFixed(2)} kr</span>
            </div>

            {totalDiscount > 0 && (
              <div className="summaryRow">
                <span>Rabatt:</span>
                <span>-{totalDiscount.toFixed(2)} kr</span>
              </div>
            )}

            {originalTotal > totalPrice && (
              <div className="summaryRow">
                <span>Delsum:</span>
                <span>{totalPrice.toFixed(2)} kr</span>
              </div>
            )}  

            <div className="summaryRow">
              <span>MVA:</span>
              <span>Inkludert</span>
            </div>

            <div className="summaryRow">
              <span>Frakt:</span>
              <span>Beregnes neste steg</span>
            </div>

            <div className="summaryRow totalRow">
              <span>Totalpris:</span>
              <span>{totalPrice.toFixed(2)} kr</span>
            </div>


              <button className="checkoutButton" onClick={handleCheckout}>
                Gå til betaling
              </button>
            </div>

        </div>
        
      )}
    </main>
  );
}