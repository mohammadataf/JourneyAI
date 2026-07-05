import { Router } from "express";
import { poiController } from "../controllers/poi.controller";

const router = Router();

router.post("/pois", poiController);

export default router;