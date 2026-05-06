import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: { type: String, trim: true, default: "" },
    guest: { type: String, required: true, trim: true },
    method: {
      type: String,
      enum: ["UPI", "Card", "Cash", "Bank Transfer"],
      default: "UPI",
    },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
      default: "Paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
