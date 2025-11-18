import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getUserFromStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("userData"));
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromStorage());
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [role, setRole] = useState(localStorage.getItem("userRole")?.toLowerCase() || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole.toLowerCase());
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const userData = res.data.user;
        const userRole = userData.role?.toLowerCase() || "customer";

        setUser(userData);
        setRole(userRole);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userRole", userRole);
      })
      .catch((error) => {
        console.error("Auto-login failed:", error.response?.data);
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  // FIXED PARAMETER ORDER: login(user, token)
  const login = (user, token) => {
    if (!user || !token) return console.error("Invalid login data:", { user, token });

    const userRole = user.role?.toLowerCase() || "customer";
    console.log("✅ Logging in:", { name: user.name, email: user.email, role: userRole });

    setUser(user);
    setToken(token);
    setRole(userRole);

    localStorage.setItem("userToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("userRole", userRole);
  };

  const logout = () => {
    console.log("🔴 Logging out");
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.clear();
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};