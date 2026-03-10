import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBotReply } from "../lib/chatbot.js";
import { api } from "../lib/api.js";

export default function ChatbotPlaceholder() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [botState, setBotState] = useState({ flow: "idle", step: 0, lead: { service: undefined, answers: {} } });
  const [leadPhase, setLeadPhase] = useState({ step: 0, done: false, data: { name: "", phone: "", email: "", work: "" } });
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      from: "bot",
      text: "Hi! I’m the Apna Vision assistant. May I know your name?"
    }
  ]);

  const listRef = useRef(null);

  const quickChips = useMemo(
    () => ["Services", "Training", "Contact details", "Pricing"],
    []
  );

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function pushMessage(from, text) {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`, from, text }
    ]);
  }

  function send(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;
    pushMessage("user", trimmed);
    setInput("");
    // Lead capture flow (name -> phone -> email -> work)
    if (!leadPhase.done) {
      const next = { ...leadPhase, data: { ...leadPhase.data } };
      if (leadPhase.step === 0) {
        // Extract a clean name from phrases like "my name is ram"
        const raw = trimmed.replace(/[.!,]/g, " ");
        const match =
          raw.match(/\bmy\s+name\s+is\s+(.+)$/i) ||
          raw.match(/\bi\s*am\s+(.+)$/i) ||
          raw.match(/\bname\s*[:\-]\s*(.+)$/i);
        const extracted = (match?.[1] ?? raw).trim();
        const clean = extracted
          .split(" ")
          .slice(0, 4)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        const pretty = clean
          .split(" ")
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");

        next.data.name = pretty || "Friend";
        next.step = 1;
        setLeadPhase(next);
        window.setTimeout(
          () =>
            pushMessage(
              "bot",
              `Nice to meet you, ${next.data.name}. Please share your mobile number (or type "skip").`
            ),
          250
        );
        return;
      }
      if (leadPhase.step === 1) {
        next.data.phone = /^skip$/i.test(trimmed) ? "" : trimmed;
        next.step = 2;
        setLeadPhase(next);
        window.setTimeout(
          () => pushMessage("bot", 'Thanks. Please share your email address (or type "skip").'),
          250
        );
        return;
      }
      if (leadPhase.step === 2) {
        next.data.email = /^skip$/i.test(trimmed) ? "" : trimmed;
        next.step = 3;
        setLeadPhase(next);
        window.setTimeout(
          () => pushMessage("bot", "Great. Briefly describe what work you want us to do (website/app/automation/logo/etc.)."),
          250
        );
        return;
      }
      if (leadPhase.step === 3) {
        next.data.work = trimmed;
        next.step = 4;
        next.done = true;
        setLeadPhase(next);
        // Send to backend as a chatbot lead (phone/email optional)
        const payload = {
          name: next.data.name,
          email: next.data.email || undefined,
          phone: next.data.phone || undefined,
          work: next.data.work,
          pageUrl: window.location?.href
        };
        api
          .post("/api/leads/chatbot", payload)
          .catch(() => {
            // Silent failure; admin just won't see this one
          });
        window.setTimeout(
          () =>
            pushMessage(
              "bot",
              "Thank you. Your details have been sent to Apna Vision.\n\nTo connect with our team:\nPhone: +91 7004431637\nEmail: apnavision11@gmail.com\n\nYou can also ask questions about services, training, or pricing."
            ),
          250
        );
        return;
      }
    }

    // Normal FAQ/chat mode after lead captured
    const { reply, nextState } = getBotReply(trimmed, botState);
    setBotState(nextState);
    window.setTimeout(() => pushMessage("bot", reply), 250);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="card w-[340px] overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 py-3 dark:border-slate-800/60 dark:bg-slate-950/40">
              <div>
                <div className="text-sm font-bold">Apna Vision Assistant</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">Instant replies (FAQ)</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-ghost rounded-xl px-2 py-2"
                aria-label="Close chatbot"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-2 pb-3">
                {quickChips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => send(c)}
                    className="badge hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-500/60 dark:hover:text-indigo-200 transition"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div
                ref={listRef}
                className="h-[260px] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/60 p-3 dark:border-slate-700/60 dark:bg-slate-950/25"
              >
                <div className="grid gap-2">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={[
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        m.from === "user"
                          ? "ml-auto bg-indigo-600 text-white"
                          : "mr-auto border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/60 dark:bg-slate-950/35 dark:text-slate-100"
                      ].join(" ")}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>
              </div>

              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <input
                  className="input py-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className="btn-primary px-4" type="submit">
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-primary rounded-2xl px-4 py-3 shadow-xl"
          aria-label="Open chatbot"
          title="Chatbot"
        >
          <MessageCircle className="size-5" />
          <span className="hidden sm:inline">Chat</span>
        </button>
      ) : null}
    </div>
  );
}

