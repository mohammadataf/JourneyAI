import { Request, Response } from "express";
import { generateTrip } from "../services/tripPlannerService";

export const generateTripController = async (
  req: Request,
  res: Response
) => {
  try {
   
    console.log("data",req.body)
    const result = await generateTrip(req.body);
    // console.log("5️⃣ FINAL RESULT:", result);

    // console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate trip",
    });
  }
};