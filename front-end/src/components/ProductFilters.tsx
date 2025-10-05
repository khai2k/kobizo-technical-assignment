"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ProductFilters.module.css";

interface FilterOptions {
  search: string;
  sortBy: "name" | "price" | "created_at";
  sortOrder: "asc" | "desc";
  inStock: boolean;
}

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterOptions>({
    search: searchParams.get("search") || "",
    sortBy: (searchParams.get("sortBy") as FilterOptions["sortBy"]) || "name",
    sortOrder:
      (searchParams.get("sortOrder") as FilterOptions["sortOrder"]) || "asc",
    inStock: searchParams.get("inStock") === "true",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.sortBy !== "name") params.set("sortBy", filters.sortBy);
    if (filters.sortOrder !== "asc") params.set("sortOrder", filters.sortOrder);
    if (filters.inStock) params.set("inStock", "true");

    const queryString = params.toString();
    const newUrl = queryString ? `/products?${queryString}` : "/products";

    router.push(newUrl);
  }, [filters, router]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      sortBy: "name",
      sortOrder: "asc",
      inStock: false,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.sortBy !== "name" ||
    filters.sortOrder !== "asc" ||
    filters.inStock;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filters</h3>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.filtersContent}>
          {/* Search */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Sort By */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className={styles.selectInput}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="created_at">Date Added</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className={styles.selectInput}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* In Stock Only */}
          <div className={styles.filterGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) =>
                  handleFilterChange("inStock", e.target.checked)
                }
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>In Stock Only</span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className={styles.clearButton}>
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
