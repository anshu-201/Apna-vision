import { Router } from "express";
import { ChatbotLead } from "../models/ChatbotLead.js";
import { createChatbotLeadSchema } from "../validators/chatbotLead.validator.js";

const router = Router();

router.post("/chatbot", async (req, res, next) => {
  try {
    const parsed = createChatbotLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: true,
        message: "Invalid lead data",
        details: parsed.error.flatten()
      });
    }

    const doc = await ChatbotLead.create({
      ...parsed.data,
      phone: parsed.data.phone?.trim() || undefined,
      email: parsed.data.email?.trim() || undefined,
      pageUrl: parsed.data.pageUrl?.trim() || undefined
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    next(err);
  }
});

export default router;

