import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    no: { type: String, required: true, unique: true, trim: true },
    type: {
      type: String,
      enum: ["Standard", "Deluxe", "Suite", "Presidential"],
      default: "Standard",
    },
    floor: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Cleaning", "Maintenance"],
      default: "Available",
    },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
