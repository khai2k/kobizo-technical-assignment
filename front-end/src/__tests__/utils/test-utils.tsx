import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

// Mock data
export const mockBlogPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    content: "This is a comprehensive guide to Next.js development...",
    author: "John Doe",
    published_date: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    content: "Explore advanced TypeScript concepts and patterns...",
    author: "Jane Smith",
    published_date: "2023-01-02T00:00:00Z",
  },
];

export const mockProducts = [
  {
    id: "1",
    name: "Premium Laptop",
    slug: "premium-laptop",
    price: 1299.99,
    description: "High-performance laptop for professionals",
    stock_quantity: 10,
    image_url:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    price: 199.99,
    description: "Noise-cancelling wireless headphones",
    stock_quantity: 25,
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    created_at: "2023-01-02T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  },
];

export const mockUser = {
  id: "1",
  email: "test@example.com",
  first_name: "John",
  last_name: "Doe",
  role: "user",
  status: "active",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
};

// Mock fetch responses
export const mockFetchResponses = {
  blogPosts: {
    ok: true,
    json: async () => ({
      success: true,
      data: mockBlogPosts,
      message: "Retrieved 2 blog posts",
    }),
  },
  blogPost: {
    ok: true,
    json: async () => ({
      success: true,
      data: mockBlogPosts[0],
      message: "Blog post retrieved successfully",
    }),
  },
  products: {
    ok: true,
    json: async () => ({
      success: true,
      data: mockProducts,
      message: "Retrieved 2 products",
    }),
  },
  user: {
    ok: true,
    json: async () => ({
      success: true,
      data: mockUser,
      message: "User information retrieved",
    }),
  },
  login: {
    ok: true,
    json: async () => ({
      success: true,
      data: {
        access_token: "mock-jwt-token",
        user: mockUser,
      },
      message: "Login successful",
    }),
  },
};

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };

// Simple test to ensure the test-utils file is valid
describe("Test Utils", () => {
  it("should export mock data", () => {
    expect(mockBlogPosts).toBeDefined();
    expect(mockProducts).toBeDefined();
    expect(mockUser).toBeDefined();
  });
});
