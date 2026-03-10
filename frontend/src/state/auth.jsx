import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refresh,
      async login({ email, password, role }) {
        const res = await api.post("/api/auth/login", { email, password, role });
        setUser(res.data?.user ?? null);
        return res.data;
      },
      async register({ name, email, password, role }) {
        const res = await api.post("/api/auth/register", { name, email, password, role });
        setUser(res.data?.user ?? null);
        return res.data;
      },
      async logout() {
        await api.post("/api/auth/logout");
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

