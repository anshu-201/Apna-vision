import mongoose from "mongoose";

const ChatbotLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 40 },
    email: { type: String, trim: true, lowercase: true, maxlength: 180 },
    work: { type: String, required: true, trim: true, maxlength: 5000 },
    pageUrl: { type: String, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

export const ChatbotLead = mongoose.models.ChatbotLead ?? mongoose.model("ChatbotLead", ChatbotLeadSchema);

