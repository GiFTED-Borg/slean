import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "@/constants/api";

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface Session {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface SessionContextType extends Session {
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = "user_session";
const TOKEN_STORAGE_KEY = "auth_token";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    token: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const loadSession = useCallback(async () => {
    try {
      const [token, sessionData] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_STORAGE_KEY),
        SecureStore.getItemAsync(SESSION_STORAGE_KEY),
      ]);

      if (token && sessionData) {
        const res = await fetch(`${API_BASE_URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            authToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const serverUserData = await res.json();

        if (
          !serverUserData?.success ||
          serverUserData?.error ||
          serverUserData?.statusCode === 401
        ) {
          await logout();
          return;
        }

        setSession({
          token,
          user: JSON.parse(sessionData),
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setSession((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error("Error loading session:", error);
      setSession((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load session from secure storage on app start
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = async (token: string, user: User) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token),
        SecureStore.setItemAsync(SESSION_STORAGE_KEY, JSON.stringify(user)),
      ]);

      setSession({
        token,
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY),
        SecureStore.deleteItemAsync(SESSION_STORAGE_KEY),
      ]);

      setSession({
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Error clearing session:", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    if (!session.token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { token: newToken, user } = await response.json();
        await login(newToken, user);
      } else {
        // Token refresh failed, logout user
        await logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      await logout();
    }
  };

  return (
    <SessionContext.Provider
      value={{
        ...session,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
