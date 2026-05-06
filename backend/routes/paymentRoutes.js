import { Router } from "express";
import * as c from "../controllers/paymentController.js";

const router = Router();

router.get("/summary", c.summary);
router.get("/", c.getAll);
router.get("/:id", c.getById);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
