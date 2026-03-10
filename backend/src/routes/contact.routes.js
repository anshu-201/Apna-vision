import { Router } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { createContactSchema } from "../validators/contact.validator.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const parsed = createContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: true,
        message: "Invalid form data",
        details: parsed.error.flatten()
      });
    }

    const doc = await ContactMessage.create(parsed.data);
    res.status(201).json({
      ok: true,
      id: doc._id
    });
  } catch (err) {
    next(err);
  }
});

export default router;

