import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import { portfolioProjects } from "../lib/data.js";

export default function Portfolio() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Portfolio</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          A snapshot of projects and ideas we love building. Replace/add screenshots and links anytime.
        </p>
      </motion.div>

      <Section
        badge="Projects"
        title="Selected work"
        subtitle="Modern UI, clean architecture, and high-performance experiences."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="card card-hover overflow-hidden"
            >
              <div className="h-32 bg-[linear-gradient(135deg,rgba(99,102,241,0.25),rgba(16,185,129,0.18))] dark:bg-[linear-gradient(135deg,rgba(99,102,241,0.18),rgba(16,185,129,0.12))]" />
              <div className="p-6">
                <div className="badge">{p.tag}</div>
                <div className="mt-3 text-base font-bold">{p.title}</div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.summary}</div>
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  Add live demo / GitHub link here.
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

