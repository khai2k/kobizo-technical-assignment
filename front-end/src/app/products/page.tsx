import { Suspense } from "react";
import { fetchProducts, Product } from "@/lib/api";
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

// Server-side filtering and sorting function
function filterAndSortProducts(
  products: Product[],
  search: string = "",
  sortBy: string = "name",
  sortOrder: string = "asc",
  inStock: boolean = false
): Product[] {
  let filteredProducts = [...products];

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by stock availability
  if (inStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock_quantity > 0
    );
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "created_at":
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
        break;
      default: // name
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filteredProducts;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Fetch products from API
  const allProducts = await fetchProducts();

  // Parse search parameters
  const search = searchParams.search || "";
  const sortBy = searchParams.sortBy || "name";
  const sortOrder = searchParams.sortOrder || "asc";
  const inStock = searchParams.inStock === "true";
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 12;

  // Filter and sort products
  const filteredProducts = filterAndSortProducts(
    allProducts,
    search,
    sortBy,
    sortOrder,
    inStock
  );

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Catalog</h1>
        <p className={styles.subtitle}>
          Discover our collection of {totalItems} products
        </p>
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters />
          </Suspense>
        </aside>

        <main className={styles.main}>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={paginatedProducts} />
          </Suspense>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
