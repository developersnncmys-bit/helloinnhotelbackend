import User from "../models/User.js";

export const seedDefaultAdmin = async () => {
  const count = await User.countDocuments();
  if (count > 0) return;
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
  console.log(" (Change it from the Users page after login)");
  console.log("───────────────────────────────────────────");
};
