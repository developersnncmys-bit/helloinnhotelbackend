import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guest: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: ["Direct", "Booking.com", "MakeMyTrip", "Agoda", "Other"],
      default: "Direct",
    },
    room: { type: String, required: true, trim: true },
    nights: { type: Number, required: true, min: 1 },
    checkin: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
