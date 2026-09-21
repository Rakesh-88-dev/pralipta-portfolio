import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");

        const data = response.data?.data || response.data;

        const authenticatedAdmin =
          data?.admin || data?.user || data;

        setAdmin(authenticatedAdmin || null);
      } catch (error) {
        console.error("Admin authentication check failed:", error);

        localStorage.removeItem("adminToken");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data?.data || response.data;

    const receivedToken = data?.token;

    if (!receivedToken) {
      throw new Error(
        "Authentication token was not returned by the server."
      );
    }

    localStorage.setItem("adminToken", receivedToken);

    const authenticatedAdmin =
      data?.admin || data?.user || null;

    setAdmin(authenticatedAdmin);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: Boolean(admin),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}