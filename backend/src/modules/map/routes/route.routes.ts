import { Router } from "express";
import { routeController } from "../controllers/route.controller";

const router = Router();

router.get("/", routeController);

export default router;