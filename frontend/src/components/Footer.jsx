import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/60 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/35">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2">
        <div>
          <div className="text-base font-extrabold tracking-tight">Apna Vision</div>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
            We build modern software, websites, apps, and AI automation tools — and we provide{" "}
            <span className="font-semibold text-slate-900 dark:text-white">FREE Hybrid Training</span>{" "}
            (Online + Offline) for students.
          </p>
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
            Email: <span className="font-semibold">apnavision11@gmail.com</span> • Phone:{" "}
            <span className="font-semibold">+91 7004431637</span> • Office:{" "}
            <span className="font-semibold">Gurugram, Sector 21</span>
          </p>
        </div>
        <div className="grid gap-2 sm:justify-self-end">
          <div className="text-sm font-bold">Quick links</div>
          <div className="flex flex-wrap gap-2">
            <NavLink className="badge hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700" to="/services">
              Services
            </NavLink>
            <NavLink className="badge hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700" to="/training">
              Training
            </NavLink>
            <NavLink className="badge hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700" to="/portfolio">
              Portfolio
            </NavLink>
            <NavLink className="badge hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700" to="/contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200/70 py-4 text-center text-xs text-slate-500 dark:border-slate-800/60 dark:text-slate-400">
        © {new Date().getFullYear()} Apna Vision. All rights reserved.
      </div>
    </footer>
  );
}

