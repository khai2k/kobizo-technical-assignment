const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  stock_quantity: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  expires: number;
  user: User;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private enableLogging: boolean;

  constructor(baseURL: string, enableLogging: boolean = true) {
    this.baseURL = baseURL;
    this.enableLogging = enableLogging;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (
        headers as Record<string, string>
      ).Authorization = `Bearer ${this.token}`;
    }

    // Log request details
    if (this.enableLogging) {
      console.group(`🚀 API Request: ${options.method || "GET"} ${endpoint}`);
      console.log("📍 URL:", url);
      console.log("🔑 Headers:", headers);
      if (options.body) {
        console.log("📤 Request Body:", JSON.parse(options.body as string));
      }
      console.log("⚙️ Options:", {
        method: options.method || "GET",
        cache: options.cache,
        credentials: options.credentials,
      });
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Log response details
      if (this.enableLogging) {
        console.log(
          "📊 Response Status:",
          response.status,
          response.statusText
        );
        console.log(
          "📋 Response Headers:",
          Object.fromEntries(response.headers.entries())
        );
      }

      const data = await response.json();

      if (this.enableLogging) {
        console.log("📥 Response Data:", data);
      }

      if (!response.ok) {
        if (this.enableLogging) {
          console.error("❌ API Error:", {
            status: response.status,
            statusText: response.statusText,
            error: data.error,
            message: data.message,
          });
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (this.enableLogging) {
        console.log("✅ API Success");
        console.groupEnd();
      }
      return data;
    } catch (error) {
      if (this.enableLogging) {
        console.error("💥 API Request Failed:", {
          endpoint,
          error: error instanceof Error ? error.message : error,
          stack: error instanceof Error ? error.stack : undefined,
        });
        console.groupEnd();
      }
      throw error;
    }
  }

  // Authentication methods
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<AuthResponse["user"]>> {
    return this.request<AuthResponse["user"]>("/api/v1/auth/me");
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request<null>("/api/v1/auth/logout", {
      method: "POST",
    });
  }

  // Product methods
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>("/api/v1/products");
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/api/v1/products/${id}`);
  }

  // Checkout methods
  async checkout(
    items: Array<{ productId: number; quantity: number }>
  ): Promise<ApiResponse<any>> {
    return this.request<any>("/api/v1/checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  }

  // Blog methods
  async getBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    return this.request<BlogPost[]>("/api/v1/blog");
  }

  async getBlogPost(slug: string): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/api/v1/blog/${slug}`);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(
  API_BASE_URL,
  process.env.NODE_ENV === "development"
);

// Helper function to get products with error handling
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.getProducts();
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || "Failed to fetch products");
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Helper function to get blog posts with error handling
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await apiClient.getBlogPosts();
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || "Failed to fetch blog posts");
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Helper function to get single blog post with error handling
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await apiClient.getBlogPost(slug);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || "Failed to fetch blog post");
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
