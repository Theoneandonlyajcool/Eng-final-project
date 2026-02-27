import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthState } from "@/types";

const AuthContext = createContext<{
  authState: AuthState;
  login: () => void;
  logout: () => void;
} | null>(null);

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
};

const getUserFromSession = (): User => {
  try {
    const storedCredentials = sessionStorage.getItem("User_Credentials");
    if (!storedCredentials) return mockUser;

    const parsed = JSON.parse(storedCredentials) as {
      name?: string;
      email?: string;
    };

    return {
      ...mockUser,
      name: parsed.name?.trim() || mockUser.name,
      email: parsed.email?.trim() || mockUser.email,
    };
  } catch {
    return mockUser;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isAuthenticated) {
          setAuthState({
            isAuthenticated: true,
            user: getUserFromSession(),
            isLoading: false,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = () => {
    setAuthState({
      isAuthenticated: true,
      user: getUserFromSession(),
      isLoading: false,
    });
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return {
    ...context.authState,
    login: context.login,
    logout: context.logout,
  };
}
