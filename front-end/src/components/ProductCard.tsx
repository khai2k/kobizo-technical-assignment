"use client";

import { Product } from "@/lib/api";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const isInStock = product.stock_quantity > 0;
  const stockStatus = isInStock ? "In Stock" : "Out of Stock";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={styles.placeholderImage}
          style={{ display: product.image_url ? "none" : "flex" }}
        >
          <span className={styles.imageText}>Product Image</span>
        </div>
        {!isInStock && (
          <div className={styles.outOfStockOverlay}>Out of Stock</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceContainer}>
          <span className={styles.price}>{product.price}</span>
          <span
            className={`${styles.stock} ${!isInStock ? styles.outOfStock : ""}`}
          >
            {stockStatus}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.addToCart} ${
              !isInStock ? styles.disabled : ""
            }`}
            onClick={() => onAddToCart?.(product)}
            disabled={!isInStock}
          >
            {isInStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
