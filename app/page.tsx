"use client";

import { useState, useContext, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { ApiProduct } from "@/types/product";
import { CartContext } from "@/context/CartContext";
import { SearchContext } from "@/context/SearchContext";

export default function Home() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext mangler");
  }

  const {
  cart,
  handleAddToCart,
  handleRemoveFromCart,
  handleClearItemFromCart,
} = cartContext;

  



  const searchContext = useContext(SearchContext);

if (!searchContext) {
  throw new Error("SearchContext mangler");
}

const { search, setProducts } = searchContext;

  const [sortOrder, setSortOrder] = useState("low");
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");



  const testApi = async () => {
    try {
      const response = await fetch("https://v2.api.noroff.dev/online-shop");

      if (!response.ok) {
        setError("Kunne ikke hente produkter.");
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      setApiProducts(result.data);
      setProducts(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("En uventet feil oppstod.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => testApi());
  }, []);

  const filteredProducts = apiProducts.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <main>
      <div className="filterButtons">
        <button onClick={() => setSortOrder("low")}>Lavest pris</button>
        <button onClick={() => setSortOrder("high")}>Høyest pris</button>
      </div>

      {isLoading ? (
        <div className="loadingContainer">
          <p className="loadingText">Laster produkter...</p>
        </div>
      ) : error ? (
        <div className="errorContainer">
          <p className="errorMessage">{error}</p>
        </div>
      ) : (
        <div className="productGrid">
          {sortedProducts.map((product) => {
            const cartItem = cart.find(
              (cartItem) => cartItem.product.id === product.id
            );

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                discountedPrice={product.discountedPrice}
                image={product.image.url}
                rating={product.rating}
                category={product.tags[0]}
                product={product}
                onAddToCart={handleAddToCart}
                quantity={cartItem?.quantity ?? 0}
                onRemoveFromCart={handleRemoveFromCart}
                onClearItemFromCart={handleClearItemFromCart}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}