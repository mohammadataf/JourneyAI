import { Router } from "express";
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


export default router;