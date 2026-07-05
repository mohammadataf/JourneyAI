import { Request, Response } from "express";
import { getPOIs, Theme } from "../services/poi.service";

export async function poiController(req: Request, res: Response) {
  try {
    const { start, end, theme } = req.body;

    const pois = await getPOIs(start, end, theme as Theme);

    res.status(200).json({
      success: true,
      pois,
    });
    console.log("pois",pois)
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch POIs",
    });
  }
}