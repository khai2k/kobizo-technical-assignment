"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Showing {startItem}-{endItem} of {totalItems} products
      </div>

      <div className={styles.paginationControls}>
        <button
          className={`${styles.pageButton} ${styles.prevButton}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePage : ""
              } ${page === "..." ? styles.ellipsis : ""}`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`${styles.pageButton} ${styles.nextButton}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
