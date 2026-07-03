import { Request, Response } from "express";
import { searchPlacesService } from "../services/search.service";

export const searchPlaces = async (
  req: Request,
  res: Response
) => {
  try {
    const { query } = req.body;
   

    const places = await searchPlacesService(query);

    res.status(200).json({
      success: true,
      places,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to search places",
    });
  }
};