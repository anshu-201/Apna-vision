import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="card card-hover p-6"
    >
      <div className="flex items-start gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-base font-bold">{title}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</div>
        </div>
      </div>
    </motion.div>
  );
}

