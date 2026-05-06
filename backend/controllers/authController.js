import User from "../models/User.js";

export const needsSetup = async (_req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.json({ needsSetup: count === 0 });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`[login] attempt for email="${email}"`);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      console.log(`[login] FAIL — no user with email "${email.toLowerCase().trim()}"`);
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.status !== "Active") {
      console.log(`[login] FAIL — user "${user.email}" is ${user.status}`);
      return res.status(403).json({ message: "Account is inactive — please contact an administrator" });
    }
    const ok = await user.comparePassword(password);
    if (!ok) {
      console.log(`[login] FAIL — wrong password for "${user.email}"`);
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(`[login] OK — "${user.email}"`);
    const safe = user.toObject();
    delete safe.password;
    res.json(safe);
  } catch (err) {
    next(err);
  }
};
