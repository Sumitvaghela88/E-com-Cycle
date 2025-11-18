import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/customer-auth" />;
  if (role !== "admin") return <Navigate to="/" />;

  return children;
}
