"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import styles from "./page.module.css";

interface ProductsPageProps {
  searchParams: {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    inStock?: string;
    page?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.search || "",
    sortBy: searchParams.sortBy || "name",
    sortOrder: searchParams.sortOrder || "asc",
    inStock: searchParams.inStock === "true",
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts({
    ...filters,
    page: currentPage,
    limit: 12,
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading products</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          Discover our collection of high-quality products
        </p>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className={styles.main}>
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <ProductGrid products={products} />

          {products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / 12)}
              onPageChange={handlePageChange}
            />
          )}

          {products.length === 0 && (
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>No products found</h2>
              <p className={styles.emptyDescription}>
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
