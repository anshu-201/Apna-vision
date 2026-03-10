import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles, Timer } from "lucide-react";
import Section from "../components/Section.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { services, testimonials } from "../lib/data.js";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/65 p-8 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/35 sm:p-12">
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-indigo-600/10 blur-2xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-emerald-500/10 blur-2xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="badge">
              <Sparkles className="mr-2 size-4" />
              Modern software • Premium UI • Fast delivery
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl"
            >
              Build your next product with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                Apna Vision
              </span>
              .
            </motion.h1>
            <p className="mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              We provide Web Development, App Development, AI/Automation Tools, Software Development, and Logo Design —
              plus <span className="font-semibold text-slate-900 dark:text-white">FREE Hybrid Training</span> (Online +
              Offline) for students.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink className="btn-primary" to="/contact">
                Get a Free Consultation <ArrowRight className="size-4" />
              </NavLink>
              <NavLink className="btn-ghost" to="/services">
                Explore Services
              </NavLink>
              <NavLink className="btn-ghost" to="/training">
                Free Training
              </NavLink>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Timer, label: "Fast delivery", value: "On-time milestones" },
                { icon: ShieldCheck, label: "Reliable", value: "Clean, scalable builds" },
                { icon: GraduationCap, label: "Training", value: "Hybrid (free)" }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-2xl bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{label}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">{value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card p-6">
              <div className="text-sm font-bold">What we do</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {services.slice(0, 4).map((s) => (
                  <div key={s.title} className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-slate-800/60 dark:bg-slate-950/30">
                    <div className="text-sm font-semibold">{s.title}</div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <div className="text-sm font-bold">Free Hybrid Training</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Learn with real projects, mentorship, and step-by-step guidance. Online + Offline options available.
              </p>
              <div className="mt-4 flex gap-3">
                <NavLink to="/training" className="btn-primary">
                  Register Now <ArrowRight className="size-4" />
                </NavLink>
                <NavLink to="/about" className="btn-ghost">
                  Learn more
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        badge="Services"
        title="Everything you need to launch"
        subtitle="Modern engineering + premium UI. Built for performance, conversion, and long-term maintenance."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Section>

      <Section
        badge="Why choose us"
        title="Professional delivery, friendly collaboration"
        subtitle="We focus on clarity, speed, and quality — so you can ship confidently."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Modern UI + UX",
              desc: "Clean components, responsive layouts, and polished interactions that look premium."
            },
            {
              title: "Scalable architecture",
              desc: "API-first backend, reusable components, and code that stays maintainable as you grow."
            },
            {
              title: "Trust + transparency",
              desc: "Clear milestones, proactive updates, and solid support after delivery."
            }
          ].map((b) => (
            <div key={b.title} className="card p-6">
              <div className="text-base font-bold">{b.title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{b.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        badge="Training"
        title="FREE Hybrid Training (Online + Offline)"
        subtitle="Build real projects with mentorship. Ideal for students looking for job-ready skills."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "Web Development", desc: "HTML, CSS, JS, responsive UI + projects." },
            { title: "MERN Stack", desc: "React, Node, Express, MongoDB — full-stack projects." },
            { title: "AI Tools", desc: "AI productivity, automation, and practical tool usage." }
          ].map((c) => (
            <div key={c.title} className="card p-6">
              <div className="text-base font-bold">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.desc}</div>
              <div className="mt-4">
                <NavLink to="/training" className="btn-ghost">
                  Register <ArrowRight className="size-4" />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section badge="Testimonials" title="People love working with us" subtitle="Results-driven work with a friendly process.">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="text-sm font-bold">{t.name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">{t.role}</div>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        badge="Contact"
        title="Ready to build something great?"
        subtitle="Tell us what you need — we’ll reply with a clear plan, timeline, and next steps."
      >
        <div className="card p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-lg font-bold">Let’s talk</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Web • App • AI Automation • Software • Branding
              </div>
            </div>
            <div className="flex gap-3">
              <NavLink to="/contact" className="btn-primary">
                Contact Us <ArrowRight className="size-4" />
              </NavLink>
              <NavLink to="/portfolio" className="btn-ghost">
                View Work
              </NavLink>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

