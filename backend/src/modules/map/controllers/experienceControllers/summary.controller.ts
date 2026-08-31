import { Request, Response } from "express";
import { generateSummary } from "../../services/experienceServices/summary.service";

export async function summaryController(
  req: Request,
  res: Response
) {
  try {

    const { poi, theme } = req.body;

    const summary = await generateSummary(
      poi,
      theme
    );

    res.json({
      summary,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to generate summary.",
    });

  }
}