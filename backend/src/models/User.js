import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "client"] }
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

