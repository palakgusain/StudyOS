import { Navigate } from "react-router-dom";

export default function RequireRevisionUnlock({ children }) {
  const unlocked = localStorage.getItem("dayCompleted") === "true";

  if (!unlocked) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
