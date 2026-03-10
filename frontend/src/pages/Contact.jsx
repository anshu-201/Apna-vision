import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { api } from "../lib/api.js";
import Section from "../components/Section.jsx";

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && form.email.includes("@") && form.message.trim().length >= 5;
  }, [form.email, form.message, form.name]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "Sending..." });
    try {
      const payload = {
        ...form,
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim() || undefined
      };
      await api.post("/api/contact", payload);
      setStatus({ state: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Tell us about your project or training query. We’ll get back to you quickly.
        </p>
      </motion.div>

      <Section badge="Contact info" title="Reach us" subtitle="Official contact details for Apna Vision.">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { icon: Mail, title: "Email", value: "apnavision11@gmail.com" },
            { icon: Phone, title: "Phone", value: "+91 7004431637" },
            { icon: MapPin, title: "Office", value: "Gurugram, Sector 21 (Online + Offline)" }
          ].map(({ icon: Icon, title, value }) => (
            <div key={title} className="card p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                  <Icon className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section badge="Form" title="Send a message" subtitle="Messages are stored in MongoDB and visible in Admin panel.">
        <div className="grid gap-6 lg:grid-cols-5">
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold">Phone (optional)</label>
                  <input
                    className="input mt-2"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold">Subject (optional)</label>
                  <input
                    className="input mt-2"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    placeholder="Project / Training / Other"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold">Message</label>
                <textarea
                  className="textarea mt-2"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you need..."
                  required
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="btn-primary" type="submit" disabled={!canSubmit || status.state === "loading"}>
                  {status.state === "loading" ? "Sending..." : "Send Message"}
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

          <div className="card overflow-hidden lg:col-span-2">
            <div className="p-6">
              <div className="text-base font-bold">Find us on map</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Approximate location for Gurugram Sector 21. You can swap this with a precise map later.
              </div>
            </div>
            <div className="h-[340px] w-full">
              <iframe
                title="Google Map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83980706046!2d77.06889949083047!3d28.527280343608343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2f2f6e9a0d7%3A0x3f77b0fd8a2f4f0b!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

