import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, default: "" },
    room: { type: String, required: true, trim: true },
    checkin: { type: Date },
    checkout: { type: Date },
    idType: {
      type: String,
      enum: ["Aadhaar", "Passport", "Driving License", "PAN Card"],
      default: "Aadhaar",
    },
    status: {
      type: String,
      enum: ["Checked In", "Checked Out"],
      default: "Checked In",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guest", guestSchema);
