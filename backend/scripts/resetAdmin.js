import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const removed = await User.deleteMany({});
  console.log(`Deleted ${removed.deletedCount} existing user(s)`);

  await User.create({
    name: "Admin",
    email: "admin@helloinn.com",
    password: "admin123",
    role: "Superadmin",
    status: "Active",
    avatar: "AD",
    color: "#1e3a8a",
  });

  console.log("───────────────────────────────────────────");
  console.log(" Default admin created");
  console.log(" Email:    admin@helloinn.com");
  console.log(" Password: admin123");
  console.log("───────────────────────────────────────────");

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
