import express from "express";

import {
  generateTripController,
} from "../controllers/tripPlannerController";

import {
  generateTripRouteController,
} from "../controllers/tripRouteController";

const router = express.Router();

// AI generates/selects relevant POIs
router.post(
  "/generate",
  generateTripController
);

// User-selected POIs -> actual route
router.post(
  "/create-route",
  generateTripRouteController
);

export default router;