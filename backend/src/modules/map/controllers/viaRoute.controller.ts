import { Request, Response } from "express";
import {getRouteWithVias} from "../services/graphhopper.service";

export async function viaRouteController(
  req: Request,
  res: Response
) {
  try {
    const { start, end, vehicle, waypoint } = req.body;

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
      message: "Failed to fetch via route",
    });
  }
}