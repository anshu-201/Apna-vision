import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { services } from "../lib/data.js";

export default function Services() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Services</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Choose what you need — from high-converting websites to automation tools and brand identity.
        </p>
      </motion.div>

      <Section badge="Offerings" title="What Apna Vision delivers" subtitle="Professional, modern, and reliable solutions.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Section>

      <Section
        badge="Process"
        title="A simple, effective workflow"
        subtitle="We keep it clear: discover → design → build → launch → support."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { step: "01", title: "Discover", desc: "Understand goals, users, and requirements." },
            { step: "02", title: "Design", desc: "Create a modern UI with a clean experience." },
            { step: "03", title: "Build", desc: "Develop fast, scalable, maintainable software." },
            { step: "04", title: "Launch", desc: "Deploy, test, and provide ongoing support." }
          ].map((p) => (
            <div key={p.step} className="card p-6">
              <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-200">{p.step}</div>
              <div className="mt-2 text-base font-bold">{p.title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.desc}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

