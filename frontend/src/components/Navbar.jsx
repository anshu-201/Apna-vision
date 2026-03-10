import React from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../state/theme.jsx";
import { useAuth } from "../state/auth.jsx";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/training", label: "Training" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/65 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/40">
      <div className="container-app flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-white shadow-glow dark:bg-slate-950">
            <img
              src="/apna-vision-logo.png"
              alt="Apna Vision logo"
              className="max-h-9 max-w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight">Apna Vision</div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Software Company</div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          <div className="relative rounded-2xl border border-slate-200 bg-white/60 p-1 dark:border-slate-800 dark:bg-slate-950/30">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative z-10 inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition",
                    isActive
                      ? "text-indigo-700 dark:text-indigo-200"
                      : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/15"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        style={{ pointerEvents: "none" }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NavLink className="btn-ghost rounded-2xl px-3 py-2" to={user.role === "student" ? "/student" : "/client"}>
                {user.role === "student" ? "Student" : "Client"}
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="btn-ghost rounded-2xl px-3 py-2"
                aria-label="Logout"
                title="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink className="btn-ghost rounded-2xl px-3 py-2" to="/signin">
              Sign In
            </NavLink>
          )}
          <button
            type="button"
            onClick={toggle}
            className="btn-ghost rounded-2xl px-3 py-2"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden text-xs font-semibold sm:inline">
              {theme === "dark" ? "Light" : "Dark"} mode
            </span>
          </button>
        </div>
      </div>

      <div className="container-app pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "badge transition",
                  isActive ? "border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-200" : ""
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

