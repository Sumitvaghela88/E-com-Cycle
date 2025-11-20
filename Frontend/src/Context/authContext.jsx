import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../Utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // AUTO LOGIN USING JS COOKIE TOKEN
  // ==============================
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.user) {
          const u = res.data.user;
          setUser(u);
          setRole(u.role?.toLowerCase());
        }
      })
      .catch(() => {
        Cookies.remove("token");
        setUser(null);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ==============================
  // LOGIN
  // ==============================
  const login = (userData, token) => {
    Cookies.set("token", token, { expires: 7 }); // store token for 7 days

    setUser(userData);
    setRole(userData.role?.toLowerCase());
  };

  // ==============================
  // LOGOUT
  // ==============================
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setRole(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
