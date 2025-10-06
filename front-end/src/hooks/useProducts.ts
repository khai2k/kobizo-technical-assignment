"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/lib/api";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Get all products
export function useProducts(filters?: {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  inStock?: boolean;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: async (): Promise<Product[]> => {
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters?.inStock)
        params.append("inStock", filters.inStock.toString());
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const response = await fetch(`/api/products?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data.success ? data.data : [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async (): Promise<Product | null> => {
      const response = await fetch(`/api/products/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      return data.success ? data.data : null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Add to cart mutation (placeholder for future implementation)
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string, quantity: number = 1) => {
      // This would be implemented when cart functionality is added
      console.log(
        `Adding product ${productId} to cart with quantity ${quantity}`
      );
      return { productId, quantity };
    },
    onSuccess: () => {
      // Invalidate product queries to refresh data
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      // Invalidate cart queries (when implemented)
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
