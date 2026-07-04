import { Router } from "express";

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "../controllers/auth.controller";

import { authenticateUser } from "../../../middlewares/auth.middleware";


const router = Router();


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