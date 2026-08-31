import { Request, Response } from "express";
import { getRoute } from "../services/graphhopper.service";

/*
  This file receives the request from the route,
  calls the service, and sends the response back.
*/

export async function routeController(req: Request, res: Response) {
  try {
    const { start,end,vehicle} = req.body;
    console.log("hello")

    const routes = await getRoute(start,end,vehicle);

    res.status(200).json({
      success:true,
      routes

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch route",
    });
  }
}