import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    minLength: 6,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minLength: 10,
  },
  cart: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
