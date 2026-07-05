import { Router } from "express";
import { viaRouteController } from "../controllers/testViaRoute.controller";

const router = Router();

router.post("/test-via-route", viaRouteController);

export default router;