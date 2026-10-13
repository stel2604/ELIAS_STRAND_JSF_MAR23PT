import type { ApiProduct } from "@/types/product";

export type CartItem = {
  product: ApiProduct;
  quantity: number;
};