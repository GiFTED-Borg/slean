import { useSession } from "@/contexts/SessionContext";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!; // "http://192.XXX.XXX.XX:8001/api/v1"

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Request failed",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }

  async put<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Hook for making authenticated API calls
export function useApi() {
  const { token, refreshToken } = useSession();

  const authenticatedRequest = async <T>(
    requestFn: (token: string) => Promise<ApiResponse<T>>
  ): Promise<ApiResponse<T>> => {
    if (!token) {
      return { success: false, error: "No authentication token" };
    }

    let response = await requestFn(token);

    // If token is expired, try to refresh
    if (!response.success && response.error?.includes("unauthorized")) {
      await refreshToken();
      // Retry with new token
      if (token) {
        response = await requestFn(token);
      }
    }

    return response;
  };

  return {
    get: <T>(endpoint: string) =>
      authenticatedRequest<T>((token) => apiClient.get<T>(endpoint, token)),
    post: <T>(endpoint: string, body: any) =>
      authenticatedRequest<T>((token) =>
        apiClient.post<T>(endpoint, body, token)
      ),
    put: <T>(endpoint: string, body: any) =>
      authenticatedRequest<T>((token) =>
        apiClient.put<T>(endpoint, body, token)
      ),
    delete: <T>(endpoint: string) =>
      authenticatedRequest<T>((token) => apiClient.delete<T>(endpoint, token)),
  };
}
