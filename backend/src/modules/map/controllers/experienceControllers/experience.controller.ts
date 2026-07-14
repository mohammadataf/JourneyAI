import { Request, Response } from "express";
import { getExperienceRoutes } from "../../services/experienceServices/experience.service";

/*
  This controller receives the request from the frontend,
  calls the Scenic Experience service,
  and sends the generated scenic routes back.
*/

export async function experienceController(
  req: Request,
  res: Response
) {
  try {
     const { start, end, vehicle, theme } = req.body;

    const experiences = await  getExperienceRoutes(
      start,
      end,
      vehicle,
      theme
    );

    res.status(200).json({
      success: true,
      experiences,
    });
    console.log("all experience",experiences)

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate experience routes",
    });
  }
}