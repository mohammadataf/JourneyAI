/*
  This file receives the request from the route,
  calls the service, and sends the response back.
*/

import { Request, Response } from "express";
import { getRouteService } from "../services/map.service";

export const getRoute = async (req: Request, res: Response) => {
  try {
    const { start, end, vehicle } = req.body;

    const routes = await getRouteService(start,end,vehicle);

    res.status(200).json({
      success: true,
      routes,
    });
  } catch (error) {
    console.error("Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch route",
    });
  }
};