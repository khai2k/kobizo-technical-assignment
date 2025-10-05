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
        <div className={styles.placeholderImage}>
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
