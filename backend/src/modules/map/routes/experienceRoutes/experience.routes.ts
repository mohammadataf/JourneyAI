import { Router } from "express";
import {  experienceController } from "../../controllers/experienceControllers/experience.controller";
import { summaryController } from "../../controllers/experienceControllers/summary.controller";
const router = Router();

/*
  Experience Route

  POST /api/experience

  Generates routes based on the selected
  experience theme.
*/

router.post("/experience",  experienceController);
router.post("/summary", summaryController);

export default router;