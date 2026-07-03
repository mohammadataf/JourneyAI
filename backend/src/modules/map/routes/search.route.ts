import { Router } from "express";
import { searchPlaces } from "../controllers/search.controller";

const router = Router();

router.post("/", searchPlaces);

export default router;