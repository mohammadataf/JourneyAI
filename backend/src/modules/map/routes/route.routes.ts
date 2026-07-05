import { Router } from "express";
import { routeController } from "../controllers/route.controller";

//   for graphhopper
/*
  This file defines all map-related API routes
  and connects them to the controller.
*/

const router = Router();

router.post("/get-routes", routeController);

export default router;