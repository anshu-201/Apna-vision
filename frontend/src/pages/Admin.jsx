import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api, adminLogout, adminMe } from "../lib/api.js";
import Section from "../components/Section.jsx";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("contacts");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [leads, setLeads] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [cRes, tRes, lRes] = await Promise.all([
        api.get("/api/admin/contacts"),
        api.get("/api/admin/trainings"),
        api.get("/api/admin/leads")
      ]);
      setContacts(cRes.data?.items ?? []);
      setTrainings(tRes.data?.items ?? []);
      setLeads(lRes.data?.items ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await adminMe();
        setAuthChecked(true);
        load();
      } catch {
        navigate("/admin-login", { replace: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = tab === "contacts" ? contacts : tab === "trainings" ? trainings : leads;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Admin Panel</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          View contact messages and training registrations.
        </p>
      </motion.div>

      <Section
        badge="Access"
        title="Admin access"
        subtitle="This page is visible only after admin login."
      >
        <div className="card p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Status:{" "}
              <span className={loading ? "font-semibold text-slate-900 dark:text-white" : "font-semibold"}>
                {!authChecked ? "Checking..." : loading ? "Loading..." : "Ready"}
              </span>
              {error ? <span className="ml-2 text-rose-600 dark:text-rose-400">({error})</span> : null}
            </div>
            <div className="flex gap-2">
              <button className="btn-primary" type="button" onClick={load} disabled={loading || !authChecked}>
                Refresh
              </button>
              <button
                className="btn-ghost"
                type="button"
                onClick={async () => {
                  await adminLogout();
                  navigate("/admin-login", { replace: true });
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section badge="Submissions" title="Inbox" subtitle="Most recent submissions appear first.">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("contacts")}
            className={["btn", tab === "contacts" ? "btn-primary" : "btn-ghost"].join(" ")}
          >
            Contact messages ({contacts.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("trainings")}
            className={["btn", tab === "trainings" ? "btn-primary" : "btn-ghost"].join(" ")}
          >
            Training registrations ({trainings.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("leads")}
            className={["btn", tab === "leads" ? "btn-primary" : "btn-ghost"].join(" ")}
          >
            Chatbot leads ({leads.length})
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          {items.length === 0 ? (
            <div className="card p-6 text-sm text-slate-600 dark:text-slate-300">
              No items yet. Submit the forms from Training/Contact pages.
            </div>
          ) : null}

          {items.map((it) => (
            <div key={it._id} className="card p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-bold">{it.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {it.email ? it.email : tab === "leads" ? "(email not provided)" : ""}
                    {it.phone ? ` • ${it.phone}` : ""}
                    {tab === "trainings" ? ` • ${it.course} • ${it.modePreference}` : ""}
                  </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{formatDate(it.createdAt)}</div>
              </div>

              {tab === "contacts" ? (
                <div className="mt-3 grid gap-2 text-sm">
                  {it.subject ? (
                    <div>
                      <span className="font-semibold">Subject:</span> {it.subject}
                    </div>
                  ) : null}
                  <div className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{it.message}</div>
                </div>
              ) : tab === "trainings" ? (
                <div className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  {it.college ? (
                    <div>
                      <span className="font-semibold">College:</span> {it.college}
                    </div>
                  ) : null}
                  {it.message ? (
                    <div className="whitespace-pre-wrap">
                      <span className="font-semibold">Message:</span> {it.message}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <div className="whitespace-pre-wrap">
                    <span className="font-semibold">Work:</span> {it.work}
                  </div>
                  {it.pageUrl ? (
                    <div className="text-xs text-slate-600 dark:text-slate-300 break-all">
                      <span className="font-semibold">Page:</span> {it.pageUrl}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

