import { Request, Response } from "express";
import { getRoute } from "../services/graphhopper.service";

export async function routeController(req: Request, res: Response) {
  try {
    const { startLat, startLng, endLat, endLng } = req.query;

    const route = await getRoute(
      Number(startLat),
      Number(startLng),
      Number(endLat),
      Number(endLng)
    );

    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch route",
    });
  }
}