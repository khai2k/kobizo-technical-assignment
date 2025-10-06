"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPost } from "@/lib/api";

// Query keys
export const blogKeys = {
  all: ["blog"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
};

// Get all blog posts
export function useBlogPosts(filters?: {
  search?: string;
  author?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: blogKeys.list(filters || {}),
    queryFn: async (): Promise<BlogPost[]> => {
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.author) params.append("author", filters.author);
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const response = await fetch(`/api/blog?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const data = await response.json();
      return data.success ? data.data : [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single blog post
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: async (): Promise<BlogPost | null> => {
      const response = await fetch(`/api/blog/${slug}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch blog post");
      }

      const data = await response.json();
      return data.success ? data.data : null;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Like blog post mutation (placeholder for future implementation)
export function useLikeBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      // This would be implemented when like functionality is added
      console.log(`Liking blog post: ${slug}`);
      return { slug, liked: true };
    },
    onSuccess: (data, slug) => {
      // Invalidate specific blog post and blog list
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

// Bookmark blog post mutation (placeholder for future implementation)
export function useBookmarkBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      // This would be implemented when bookmark functionality is added
      console.log(`Bookmarking blog post: ${slug}`);
      return { slug, bookmarked: true };
    },
    onSuccess: (data, slug) => {
      // Invalidate specific blog post
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(slug) });
    },
  });
}
