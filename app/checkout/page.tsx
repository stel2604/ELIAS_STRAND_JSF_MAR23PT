"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) {
    throw new Error("CartContext mangler");
  }

  const { cart, setCart } = cartContext;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalDiscount = originalTotal - subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCart([]);
    router.push("/checkout-success");
  };

  return (
    <main className={styles.cartPage}>
      <h1>Kasse</h1>

      <form onSubmit={handleSubmit} className={styles.cartLayout}>
        {/* Venstre side: Skjema */}
        <div className={styles.formSection}>
          <section className={styles.cardBox}>
            <h2>1. Personopplysninger</h2>
            <div className={styles.gridTwoCols}>
              <input
                type="text"
                placeholder="Fornavn"
                required
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Etternavn"
                required
                className={styles.inputField}
              />
            </div>
            <input
              type="email"
              placeholder="E-postadresse"
              required
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Gateadresse"
              required
              className={styles.inputField}
            />
            <div className={styles.gridAddress}>
              <input
                type="text"
                placeholder="Postnr"
                required
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Poststed"
                required
                className={styles.inputField}
              />
            </div>
          </section>
        </div>

        {/* Høyre side: Sammendrag */}
        <div className={styles.cartSummary}>
          <h2>Sammendrag</h2>

          <div className={styles.summaryRow}>
            <span>Totalt antall varer:</span>
            <span>{totalItems}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Varer før rabatt:</span>
            <span>{originalTotal.toFixed(2)} kr</span>
          </div>

          {totalDiscount > 0 && (
            <div className={styles.summaryRow}>
              <span>Rabatt:</span>
              <span>-{totalDiscount.toFixed(2)} kr</span>
            </div>
          )}

          <div className={styles.summaryRow}>
            <span>Delsum:</span>
            <span>{subtotal.toFixed(2)} kr</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Totalpris:</span>
            <span>{subtotal.toFixed(2)} kr</span>
          </div>

          <button type="submit" className={styles.checkoutButton}>
            Fullfør betaling
          </button>
        </div>
      </form>
    </main>
  );
}