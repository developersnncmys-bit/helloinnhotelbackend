import { Router } from "express";
import { login, needsSetup } from "../controllers/authController.js";

const router = Router();

router.get("/needs-setup", needsSetup);
router.post("/login", login);

export default router;
