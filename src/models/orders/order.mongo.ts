import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  items: {
    type: Array,
    required: [true, "Orders can't be empty"],
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

export const Order = mongoose.model("Order", orderSchema);
