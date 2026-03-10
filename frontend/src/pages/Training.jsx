import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api.js";
import Section from "../components/Section.jsx";

const courseOptions = ["Web Development", "MERN Stack", "AI Tools"];
const modeOptions = ["Hybrid", "Online", "Offline"];

export default function Training() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Web Development",
    modePreference: "Hybrid",
    college: "",
    message: ""
  });

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && form.email.includes("@") && form.phone.trim().length >= 7;
  }, [form.email, form.name, form.phone]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "Submitting..." });
    try {
      const payload = {
        ...form,
        college: form.college.trim() || undefined,
        message: form.message.trim() || undefined
      };
      await api.post("/api/training", payload);
      setStatus({ state: "success", message: "Registration submitted successfully!" });
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "Web Development",
        modePreference: "Hybrid",
        college: "",
        message: ""
      });
    } catch (err) {
      setStatus({
        state: "error",
        message: err?.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">FREE Hybrid Training</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Learn with real projects and mentorship. Hybrid means <span className="font-semibold">Online + Offline</span>.
          Register below — we’ll contact you with the next batch details.
        </p>
      </motion.div>

      <Section
        badge="Courses"
        title="Courses offered"
        subtitle="Choose one course and start building job-ready skills."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "Web Development", desc: "HTML, CSS, JavaScript, responsive UI + mini projects." },
            { title: "MERN Stack", desc: "React, Node, Express, MongoDB — full-stack projects and APIs." },
            { title: "AI Tools", desc: "AI productivity, automation basics, and practical tool usage." }
          ].map((c) => (
            <div key={c.title} className="card p-6">
              <div className="text-base font-bold">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.desc}</div>
              <div className="mt-4">
                <span className="badge">FREE</span>
                <span className="badge ml-2">Hybrid</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        badge="Registration"
        title="Register now"
        subtitle="Your details are stored securely in our system for training coordination."
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="card p-6 lg:col-span-2">
            <div className="text-base font-bold">What you get</div>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              {[
                "Project-based learning",
                "Mentorship & guidance",
                "Interview-ready skills",
                "Hybrid sessions (Online + Offline)"
              ].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-500/80" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 lg:col-span-3">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold">Full name</label>
                  <input
                    className="input mt-2"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold">Email</label>
                  <input
                    className="input mt-2"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold">Phone</label>
                  <input
                    className="input mt-2"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="10-digit phone"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold">Course</label>
                  <select
                    className="input mt-2"
                    value={form.course}
                    onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                  >
                    {courseOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold">Mode</label>
                  <select
                    className="input mt-2"
                    value={form.modePreference}
                    onChange={(e) => setForm((f) => ({ ...f, modePreference: e.target.value }))}
                  >
                    {modeOptions.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold">College (optional)</label>
                  <input
                    className="input mt-2"
                    value={form.college}
                    onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))}
                    placeholder="College name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold">Message (optional)</label>
                  <input
                    className="input mt-2"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Any note"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="btn-primary" type="submit" disabled={!canSubmit || status.state === "loading"}>
                  {status.state === "loading" ? "Submitting..." : "Submit Registration"}
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
        </div>
      </Section>
    </div>
  );
}

