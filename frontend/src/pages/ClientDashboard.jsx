import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import { useAuth } from "../state/auth.jsx";

export default function ClientDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Client Dashboard</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Welcome, <span className="font-semibold">{user?.name}</span>.
        </p>
      </motion.div>

      <Section badge="Coming soon" title="Your project space" subtitle="You can extend this for project tracking and updates.">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "Project status", desc: "Track milestones and delivery timeline." },
            { title: "Requests", desc: "Submit changes, features, and feedback." },
            { title: "Files & links", desc: "Collect assets, deployments, and documents." }
          ].map((c) => (
            <div key={c.title} className="card card-hover p-6">
              <div className="text-base font-bold">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.desc}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

