import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";

export default function About() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Apna Vision</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          Apna Vision is a modern software company focused on delivering high-quality digital products and empowering
          students with{" "}
          <span className="font-semibold text-slate-900 dark:text-white">FREE Hybrid Training</span> (Online + Offline).
        </p>
      </motion.div>

      <Section
        badge="Mission & Vision"
        title="Build, automate, and empower"
        subtitle="We aim to help businesses grow through technology and help students become job-ready."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card p-6">
            <div className="text-base font-bold">Mission</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Deliver reliable, modern software solutions that create real business impact — with clear communication,
              clean code, and premium UI.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-base font-bold">Vision</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Become a trusted technology partner for businesses and a strong learning platform for students through
              practical, project-based training.
            </p>
          </div>
        </div>
      </Section>

      <Section badge="Founder" title="Founder details" subtitle="Real details for Apna Vision.">
        <div className="card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="grid size-20 place-items-center rounded-3xl bg-indigo-600/10 text-2xl font-extrabold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
              AK
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold">A.K. Singh</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Founder &amp; Lead Engineer</div>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                Passionate about building modern products, mentoring students, and creating high-quality experiences
                across web, mobile, and automation — with a strong focus on practical learning for students.
              </p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Email: <span className="font-semibold">apnavision11@gmail.com</span> • Phone:{" "}
                <span className="font-semibold">+91 7004431637</span> • Office:{" "}
                <span className="font-semibold">Gurugram, Sector 21</span>
              </p>
            </div>
            <div className="grid gap-2">
              <div className="badge">Web + App</div>
              <div className="badge">MERN Stack</div>
              <div className="badge">AI Automation</div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        badge="Skills"
        title="Skills & expertise"
        subtitle="A balanced blend of design thinking and engineering discipline."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "Frontend", items: ["React", "Responsive UI", "UX-first design", "Animations"] },
            { title: "Backend", items: ["Node + Express", "REST APIs", "Validation", "Security basics"] },
            { title: "Database & Tools", items: ["MongoDB", "Mongoose", "Deployment ready", "Automation mindset"] }
          ].map((col) => (
            <div key={col.title} className="card p-6">
              <div className="text-base font-bold">{col.title}</div>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                {col.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block size-2 rounded-full bg-indigo-600/70" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

