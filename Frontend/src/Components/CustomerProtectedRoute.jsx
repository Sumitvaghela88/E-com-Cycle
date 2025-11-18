import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function CustomerProtectedRoute({ children }) {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/customer-auth" />;
  if (role !== "customer") return <Navigate to="/" />;

  return children;
}
