import { Request, Response } from "express";
import * as exploreService from "../services/explore.service";


export async function getNearby(req: Request, res: Response) {
  try {
    const { category, lat, lng, radius } = req.query;

    if (!category || !lat || !lng) {
      return res.status(400).json({
        message: "category, lat and lng are required",
      });
    }

    const places = await exploreService.getNearby({
      category: category as string,
      lat: Number(lat),
      lng: Number(lng),
      radius: radius ? Number(radius) : 5000,
    });

    res.status(200).json(places);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch nearby places",
    });
  }
}