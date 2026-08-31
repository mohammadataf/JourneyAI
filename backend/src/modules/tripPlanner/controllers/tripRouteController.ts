import { Request, Response } from "express";

import { generateTripRoute } from "../services/tripRouteService";

export const generateTripRouteController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Trip Route Data:", req.body);

    const {
      start,
      pois,
      vehicle,
    } = req.body;

    const result = await generateTripRoute({
      start: {
        latitude: Number(start.latitude),
        longitude: Number(start.longitude),
      },

      selectedPOIs: pois,

      vehicle,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Trip Route Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create route",
    });
  }
};