import { Router } from "express";

import { authenticateUser } from "../../../middlewares/auth.middleware";

import {
    createJourney,
    getUserJourneys
} from "../controllers/journey.controller";

const router = Router();

router.get(
    "/",
    authenticateUser,
    getUserJourneys
);

router.post(
    "/",
    authenticateUser,
    createJourney
);
export default router;