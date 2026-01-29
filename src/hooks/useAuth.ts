import { useState, useEffect, useCallback } from "react";
import {
  verifySession,
  getSessionCookie,
  getAuthUrl,
  logout as authLogout,
  type SessionPayload,
} from "../lib/auth";

interface AuthState {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: SessionPayload | null;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SessionPayload | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const token = getSessionCookie();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const session = await verifySession(token);
      setUser(session);
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  const login = useCallback(() => {
    window.location.href = getAuthUrl();
  }, []);

  const logout = useCallback(() => {
    authLogout();
  }, []);

  return {
    isAuthenticated: isLoading ? null : !!user,
    isLoading,
    user,
    login,
    logout,
  };
}
