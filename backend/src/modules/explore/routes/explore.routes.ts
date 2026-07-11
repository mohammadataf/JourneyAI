import { Router } from "express";
import * as  exploreController from "../controllers/explore.controller";

const router = Router();

// router.get("/health", exploreController.health);
router.get("/nearby", exploreController.getNearby);

export default router;