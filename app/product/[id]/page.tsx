import AddToCartButton from "@/components/AddToCartButton";
import styles from "./product.module.css";
import { ApiProduct } from "@/types/product";



export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: { data: ApiProduct } | null = null;
  let errorMessage = "";
  try {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
if (!response.ok) {
    throw new Error("HTTP_ERROR");
  }

  product = await response.json();


} catch {
  errorMessage = "En uventet feil oppstod...";
}

if (errorMessage || !product) {
  return (
    <div className="loadingContainer">
      <p className="errorMessage">{errorMessage}</p>
    </div>
  );
}

  const hasDiscount = product.data.discountedPrice < product.data.price;

  return (
  <main className={styles.productContainer}>
      
    {/* Bilde-seksjon */}
    <div className={styles.imageWrapper}>
      {product.data.image?.url && (
        <img
          src={product.data.image.url}
          alt={product.data.image.alt || product.data.title}
          className={styles.productImage}
        />
      )}
    </div>

    {/* Info-seksjon */}
    <div className={styles.infoWrapper}>
      <h1 className={styles.title}>{product.data.title}</h1>

      {/* TERNARY-SJEKK: Håndterer BÅDE rabatt og ordinær pris */}
      {hasDiscount ? (
        // Dette kjøres hvis hasDiscount er TRUE:
        <>
          <p className={styles.oldPrice}>Førpris: {product.data.price} kr</p>
          <p className={styles.discountedPrice}>Nå: {product.data.discountedPrice} kr</p>
        </>
      ) : (
        // Dette kjøres hvis hasDiscount er FALSE:
        <p className={styles.price}>Pris: {product.data.price} kr</p>
      )}

      <p className={styles.rating}>Rating: {product.data.rating}</p>
      <p className={styles.tag}>Tag: {product.data.tags?.[0]}</p>
      <p className={styles.description}>{product.data.description}</p>
      
      <div className={styles.reviews}>
        Reviews: {product.data.reviews?.map((review) => (
          <div key={review.id} className={styles.review}>
            <p className={styles.reviewAuthor}>Author: {review.username}</p>
            <p className={styles.reviewRating}>Rating: {review.rating}</p>
            <p className={styles.reviewDescription}>Description: {review.description}</p>
          </div>
        ))}
      </div>

      
      <AddToCartButton product={product.data} />
        

    </div>
  </main>
);
}
