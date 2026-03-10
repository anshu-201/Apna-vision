import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card p-10 text-center">
      <div className="text-2xl font-extrabold">404</div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Page not found.</div>
      <div className="mt-6">
        <NavLink className="btn-primary" to="/">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

