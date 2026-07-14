import { Router } from "express";
import {  experienceController } from "../../controllers/experienceControllers/experience.controller";

const router = Router();

/*
  Experience Route

  POST /api/experience

  Generates routes based on the selected
  experience theme.
*/

router.post("/experience",  experienceController);

export default router;