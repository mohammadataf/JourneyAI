import { Router } from "express";
import { scenicController } from "../../controllers/experienceControllers/scenic.controller";

const router = Router();

/*
  Scenic Experience Route

  POST /api/experience/scenic

  Generates the top scenic routes between
  the given start and destination.
*/

router.post("/experience/scenic", scenicController);

export default router;