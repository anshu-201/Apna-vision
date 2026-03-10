import React from "react";
import { motion } from "framer-motion";

export default function Section({ badge, title, subtitle, children }) {
  return (
    <section className="py-10 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        {badge ? <div className="badge">{badge}</div> : null}
        {title ? <h2 className="section-title mt-3">{title}</h2> : null}
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </motion.div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

