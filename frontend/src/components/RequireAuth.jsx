import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}
