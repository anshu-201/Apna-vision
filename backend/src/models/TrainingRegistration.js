import mongoose from "mongoose";

const TrainingRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    course: {
      type: String,
      required: true,
      enum: ["Web Development", "MERN Stack", "AI Tools"]
    },
    modePreference: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Hybrid"
    },
    college: { type: String, trim: true, maxlength: 180 },
    message: { type: String, trim: true, maxlength: 2000 }
  },
  { timestamps: true }
);

export const TrainingRegistration =
  mongoose.models.TrainingRegistration ??
  mongoose.model("TrainingRegistration", TrainingRegistrationSchema);

