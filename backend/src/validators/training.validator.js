import { z } from "zod";

export const createTrainingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  course: z.enum(["Web Development", "MERN Stack", "AI Tools"]),
  modePreference: z.enum(["Online", "Offline", "Hybrid"]).optional(),
  college: z.string().trim().max(180).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal(""))
});

