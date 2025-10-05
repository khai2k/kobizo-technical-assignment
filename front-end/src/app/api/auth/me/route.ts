import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No authentication token" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Auth check API error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication check failed" },
      { status: 500 }
    );
  }
}
