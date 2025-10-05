import { Product } from "@/lib/api";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  loading?: boolean;
}

export default function ProductGrid({
  products,
  onAddToCart,
  loading,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonPrice}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📦</div>
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyDescription}>
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
