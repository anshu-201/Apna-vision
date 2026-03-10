import { z } from "zod";

export const createChatbotLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email().max(180).optional().or(z.literal("")),
  work: z.string().trim().min(3).max(5000),
  pageUrl: z.string().trim().max(500).optional().or(z.literal(""))
});

