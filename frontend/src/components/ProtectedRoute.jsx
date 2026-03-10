import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

export default function ProtectedRoute({ roles = [], children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="card p-8 text-sm text-slate-600 dark:text-slate-300">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

