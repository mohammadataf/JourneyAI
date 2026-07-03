import { Router } from "express";
import {
    registerUser,
    loginUser
} from "../controllers/auth.controller";

const router = Router();
router.post(
    "/login",
    loginUser
);

router.get("/", (_req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

router.post("/register", registerUser);

export default router;