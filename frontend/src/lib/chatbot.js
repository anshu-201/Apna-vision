const CONTACT = {
  email: "apnavision11@gmail.com",
  phone: "+91 7004431637",
  office: "Gurugram, Sector 21"
};

const SERVICES = [
  "Web Development",
  "App Development",
  "AI & Automation Tools",
  "Software Development",
  "Logo Design"
];

const COURSES = ["Web Development", "MERN Stack", "AI Tools"];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(t, words) {
  return words.some((w) => t.includes(w));
}

function detectIntent(t) {
  if (/(hi|hello|hey|hii|namaste)\b/.test(t)) return { type: "greeting" };

  if (/(contact|email|mail|phone|call|whatsapp|number)\b/.test(t)) return { type: "contact" };
  if (/(office|address|location|map|gurugram)\b/.test(t)) return { type: "location" };

  if (/(training|course|courses|batch|class|classes|join|register)\b/.test(t)) return { type: "training" };
  if (/(price|pricing|cost|budget|charge|fees)\b/.test(t)) return { type: "pricing" };
  if (/(portfolio|project|projects|work|demo)\b/.test(t)) return { type: "portfolio" };

  if (/(website|web|app|android|ios|logo|design|automation|ai|software|service|services)\b/.test(t)) {
    if (includesAny(t, ["website", "web"])) return { type: "lead", service: "Website" };
    if (includesAny(t, ["app", "android", "ios"])) return { type: "lead", service: "App" };
    if (includesAny(t, ["logo", "design"])) return { type: "lead", service: "Logo" };
    if (includesAny(t, ["automation", "ai"])) return { type: "lead", service: "AI & Automation" };
    return { type: "lead", service: "Software" };
  }

  return { type: "unknown" };
}

/**
 * Stateful reply generator.
 * @param {string} userText
 * @param {{ flow?: 'idle'|'lead', step?: number, lead?: { service?: string, answers?: Record<string,string> } }} state
 * @returns {{ reply: string, nextState: any }}
 */
export function getBotReply(userText, state = {}) {
  const t = normalize(userText);
  if (!t) {
    return {
      reply: "Type a message and I’ll help you with services, training, or contact details.",
      nextState: state
    };
  }

  // Allow global intents anytime
  const intent = detectIntent(t);
  if (intent.type === "greeting") {
    return {
      reply: "Hello! I’m the Apna Vision assistant. What do you need — website/app/logo/automation, training, or contact?",
      nextState: { flow: "idle" }
    };
  }
  if (intent.type === "contact") {
    return {
      reply: `You can contact Apna Vision at ${CONTACT.email} or ${CONTACT.phone}. Office: ${CONTACT.office}.`,
      nextState: state
    };
  }
  if (intent.type === "location") {
    return {
      reply: `Office location: ${CONTACT.office}. We also provide hybrid training (Online + Offline).`,
      nextState: state
    };
  }
  if (intent.type === "training") {
    return {
      reply: `FREE Hybrid Training is available. Courses: ${COURSES.join(", ")}. You can register on the Training page.`,
      nextState: state
    };
  }
  if (intent.type === "pricing") {
    return {
      reply: "Pricing depends on scope. Tell me what you want to build + deadline, and I’ll suggest a range.",
      nextState: state
    };
  }
  if (intent.type === "portfolio") {
    return {
      reply: "You can view our projects on the Portfolio page. Which project do you like (Netflix Clone, Repido Clone, etc.)?",
      nextState: state
    };
  }

  // Lead flow (collect info step-by-step)
  const current = {
    flow: state.flow ?? "idle",
    step: state.step ?? 0,
    lead: {
      service: state.lead?.service,
      answers: state.lead?.answers ?? {}
    }
  };

  if (current.flow === "lead") {
    const s = current.lead.service || "Website";
    const answers = { ...current.lead.answers };

    if (current.step === 0) {
      // capture service if user typed it
      if (intent.type === "lead" && intent.service) current.lead.service = intent.service;
      return {
        reply: `Great. What type of ${s.toLowerCase()} do you want (Business / Portfolio / E‑commerce / Landing page)?`,
        nextState: { flow: "lead", step: 1, lead: { ...current.lead, answers } }
      };
    }

    if (current.step === 1) {
      answers.type = userText.trim();
      return {
        reply: "How many pages/screens do you need? (Example: 5 pages, or 10 screens)",
        nextState: { flow: "lead", step: 2, lead: { service: s, answers } }
      };
    }

    if (current.step === 2) {
      answers.size = userText.trim();
      return {
        reply: "What is your timeline? (Example: 7 days / 2 weeks / 1 month)",
        nextState: { flow: "lead", step: 3, lead: { service: s, answers } }
      };
    }

    if (current.step === 3) {
      answers.timeline = userText.trim();
      return {
        reply: "Do you have a budget range? (Optional — you can type 'skip')",
        nextState: { flow: "lead", step: 4, lead: { service: s, answers } }
      };
    }

    if (current.step === 4) {
      if (t !== "skip") answers.budget = userText.trim();
      const summary = [
        `Service: ${s}`,
        answers.type ? `Type: ${answers.type}` : null,
        answers.size ? `Pages/Screens: ${answers.size}` : null,
        answers.timeline ? `Timeline: ${answers.timeline}` : null,
        answers.budget ? `Budget: ${answers.budget}` : "Budget: (not shared)"
      ]
        .filter(Boolean)
        .join("\n");

      return {
        reply:
          "Perfect. Here’s what I noted:\n" +
          summary +
          `\n\nYou can contact us at ${CONTACT.phone} or ${CONTACT.email}, or submit the Contact form. Want a callback?`,
        nextState: { flow: "idle" }
      };
    }
  }

  // Start lead flow if user mentions building something
  if (intent.type === "lead") {
    return {
      reply: `We can help. You want a ${intent.service.toLowerCase()} — great.\nWhat is your timeline? (Example: 7 days / 2 weeks / 1 month)`,
      nextState: { flow: "lead", step: 3, lead: { service: intent.service, answers: {} } }
    };
  }

  // General services answer (non-lead)
  if (/(service|services)\b/.test(t)) {
    return {
      reply: `We provide: ${SERVICES.join(", ")}. What do you want to build?`,
      nextState: state
    };
  }

  return {
    reply:
      "Thanks! Tell me what you want to build (website/app/logo/automation) or ask about training/courses/contact.",
    nextState: state
  };
}

