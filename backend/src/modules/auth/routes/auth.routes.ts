import { Router } from "express";
<<<<<<< HEAD

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth route working 🚀",
  });
});
=======
import {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshToken,
    logoutUser
} from "../controllers/auth.controller";

import { authenticateUser } from "../../../middlewares/auth.middleware";


const router = Router();

router.post(
    "/refresh",
    refreshToken
);


router.post(
    "/logout",
    logoutUser
);


// Register user
router.post(
    "/register",
    registerUser
);


// Login user
router.post(
    "/login",
    loginUser
);


// Protected route - Get current logged-in user
router.get(
    "/me",
    authenticateUser,
    getCurrentUser
);

>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f

export default router;