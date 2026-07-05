import { Request, Response } from "express";
import {
  getRouteWithVias,
  Coordinate,
} from "../services/graphhopper.service";

export async function viaRouteController(
  req: Request,
  res: Response
) {
  try {
    const { start, end, vehicle } = req.body;

    // Temporary hardcoded waypoint
    const waypoint: Coordinate = {
      latitude: 34.0956,
      longitude: 74.8637,
    };

    const routes = await getRouteWithVias(
      start,
      end,
      [waypoint],
      vehicle
    );

    res.status(200).json({
      success: true,
      routes,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch route",
    });
  }
}