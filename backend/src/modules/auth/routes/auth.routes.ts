import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

router.post("/register", registerUser);

export default router;