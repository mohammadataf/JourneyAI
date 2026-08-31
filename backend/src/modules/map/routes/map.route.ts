/*
  This file defines all map-related API routes
  and connects them to the controller.
*/

import { Router } from "express";
import { getRoute } from "../controllers/map.controller";

const router = Router();

router.post("/route", getRoute);

export default router;