import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import { useAuth } from "../state/auth.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const canSubmit = useMemo(
    () => form.email.includes("@") && form.password.length >= 6,
    [form.email, form.password]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "Signing in..." });
    try {
      await login(form);
      const from = location.state?.from;
      navigate(from || (form.role === "student" ? "/student" : "/client"), { replace: true });
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
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sign In</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Student and Client sign-in are separate. Select your role below.
        </p>
      </motion.div>

      <Section badge="Account" title="Welcome back" subtitle="Enter your credentials to continue.">
        <div className="card p-6 max-w-xl">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="text-xs font-bold">Role</label>
              <select
                className="input mt-2"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option value="student">Student</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold">Email</label>
              <input
                className="input mt-2"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold">Password</label>
              <input
                className="input mt-2"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Your password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="btn-primary" type="submit" disabled={!canSubmit || status.state === "loading"}>
                {status.state === "loading" ? "Signing in..." : "Sign In"}
              </button>
              <div
                className={[
                  "text-sm",
                  status.state === "error"
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-slate-600 dark:text-slate-300"
                ].join(" ")}
                aria-live="polite"
              >
                {status.message}
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              New here?{" "}
              <NavLink className="font-semibold text-indigo-700 dark:text-indigo-200" to="/signup">
                Create an account
              </NavLink>
              .
            </div>
          </form>
        </div>
      </Section>
    </div>
  );
}

