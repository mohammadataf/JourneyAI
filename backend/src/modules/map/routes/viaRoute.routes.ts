import { Router } from "express";
import { viaRouteController } from "../controllers/viaRoute.controller";

const router = Router();

router.post("/via-route", viaRouteController);

export default router;