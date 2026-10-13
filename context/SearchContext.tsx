"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { ApiProduct } from "@/types/product";

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  products: ApiProduct[];
  setProducts: (products: ApiProduct[]) => void;
};

export const SearchContext =
  createContext<SearchContextType | null>(null);

  export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/online-shop"
      );

      if (!response.ok) {
        throw new Error("Kunne ikke hente produkter");
      }

      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Søk: API-feil", error);
    }
  };

  void loadProducts();
}, []);

  return (
    <SearchContext.Provider value={{ search, setSearch, products, setProducts }}>
      {children}
    </SearchContext.Provider>
  );
}