import { Router } from "express";
import * as c from "../controllers/guestController.js";

const router = Router();

router.get("/", c.getAll);
router.get("/:id", c.getById);
router.post("/", c.create);
router.put("/:id", c.update);
router.patch("/:id/checkout", c.checkout);
router.delete("/:id", c.remove);

export default router;
