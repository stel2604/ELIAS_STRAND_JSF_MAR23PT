"use client";
import { ApiProduct } from "@/types/product";
import Link from "next/link";

type ProductCardProps = {
    title: string;
    price: number;
    discountedPrice: number;
    image: string;
    rating: number;
    onAddToCart?: (product: ApiProduct) => void;
    onRemoveFromCart?: (productId: string) => void;
    id: string | number;
    category: string;
    product: ApiProduct; 
    quantity: number;
    onClearItemFromCart?: (productId: string) => void;
}




export default function ProductCard({
    title,
    price,
    discountedPrice,
    image,
    rating,
    onAddToCart,
    onRemoveFromCart,
    onClearItemFromCart,
    id,
    category,
    product, 
    quantity,

}: ProductCardProps) {
    const hasDiscount = discountedPrice < price;
    const discountPercentage = Math.round(
  ((price - discountedPrice) / price) * 100
);

return (
  <article className="productCard">
    {/* HER er den nye bildebeholderen som erstatter den gamle <img> */}
    <div className="productImageWrapper">
      {hasDiscount && (
        <span className="discountBadge">-{discountPercentage}%</span>
      )}
      <img className="productImage" src={image} alt={title} />
    </div>

    <div className="productInfo">
      <Link href={`/product/${id}`}>
        <h2>{title}</h2>
      </Link>

      {hasDiscount ? (
        <div className="priceContainer">
          <span className="discountedPrice">{discountedPrice.toFixed(2)} kr</span>
          <span className="oldPrice">{price.toFixed(2)} kr</span>
        </div>
      ) : (
        <p className="price">{price.toFixed(2)} kr</p>
      )}

      <p>Rating: {rating}</p>
      <p>Category: {category}</p>

      {quantity === 0 ? (
        <button className="addOnCart" onClick={() => onAddToCart?.(product)}>
          Legg i handlekurv
        </button>
      ) : (
        <div className="quantityControls">
          <button className="removeButton" onClick={() => onRemoveFromCart?.(product.id)}>
            -
          </button>
          <span>{quantity}</span>
          <button className="addButton" onClick={() => onAddToCart?.(product)}>
            +
          </button>
        </div>
      )}

      {quantity > 1 && (
        <button className="removeAll" onClick={() => onClearItemFromCart?.(product.id)}>
          Fjern fra handlekurv.
        </button>
      )}
    </div>
  </article>
);
}


