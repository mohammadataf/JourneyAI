import { Request, Response } from "express";
import { getScenicRoutes } from "../../services/experienceServices/experience.service";

/*
  This controller receives the request from the frontend,
  calls the Scenic Experience service,
  and sends the generated scenic routes back.
*/

export async function scenicController(
  req: Request,
  res: Response
) {
  try {
    const { start, end, vehicle } = req.body;

    const experiences = await getScenicRoutes(
      start,
      end,
      vehicle
    );

    res.status(200).json({
      success: true,
      experiences,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate scenic routes",
    });
  }
}