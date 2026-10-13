"use client";

import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { SearchContext } from "@/context/SearchContext";

export default function Header() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext mangler");
  }

  const { cart } = cartContext;
  const searchContext = useContext(SearchContext);

if (!searchContext) {
  throw new Error("SearchContext mangler");
}

const { search, setSearch, products } = searchContext;

const searchResults = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);

  // Beregn antall og sum direkte fra context
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const calculatedTotal = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="logo">
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Noroff Online Shop</h1>
          <p>Velkommen til butikken min!</p>
        </Link>
      </div>

      <div className="headerActions">
        <input
          type="text"
          placeholder="Søk etter produkter"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
          {search.trim() !== "" && (
          <div className="searchResults">
            {searchResults.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                {product.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="userActions">
        <Link href="/cart" className="cart">
          <span>
            🛒 <span>{totalItems}</span>
          </span>
          <span>{calculatedTotal.toFixed(2)} kr</span>
        </Link>

        <Link href="/contact">✉️ Kontakt</Link>
      </div>
    </header>
  );
}