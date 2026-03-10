import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import { adminLogin } from "../lib/api.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const canSubmit = useMemo(() => key.trim().length >= 6, [key]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "Signing in..." });
    try {
      await adminLogin(key.trim());
      setStatus({ state: "success", message: "Signed in." });
      navigate("/admin", { replace: true });
    } catch (err) {
      setStatus({
        state: "error",
        message: err?.response?.data?.message || "Login failed."
      });
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Admin Login</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          This page is for Apna Vision admin only.
        </p>
      </motion.div>

      <Section badge="Secure" title="Sign in" subtitle="Enter your admin key to access the admin panel.">
        <div className="card p-6 max-w-xl">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="text-xs font-bold">Admin key</label>
              <input
                className="input mt-2"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter admin key"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="btn-primary" type="submit" disabled={!canSubmit || status.state === "loading"}>
                {status.state === "loading" ? "Signing in..." : "Login"}
              </button>
              <div
                className={[
                  "text-sm",
                  status.state === "success"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : status.state === "error"
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-slate-600 dark:text-slate-300"
                ].join(" ")}
                aria-live="polite"
              >
                {status.message}
              </div>
            </div>
          </form>
        </div>
      </Section>
    </div>
  );
}

