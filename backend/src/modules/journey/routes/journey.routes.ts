import { Router } from "express";

import { authenticateUser } from "../../../middlewares/auth.middleware";

import { createJourney } from "../controllers/journey.controller";

const router = Router();

router.post(
    "/",
    authenticateUser,
    createJourney
);
export default router;