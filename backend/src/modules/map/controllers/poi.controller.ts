// import { Request, Response } from "express";
// import { getPOIs, Theme } from "../services/poi.service";
// import { filterPOIs } from "../services/poiFilter.service";

// export async function poiController(req: Request, res: Response) {
//   try {
//     const { start, end, theme } = req.body;

//     const pois = await getPOIs(start, end, theme as Theme);

//     // for filter
//     // const filteredPOIs = filterPOIs(pois, theme);

//     res.status(200).json({
//       success: true,
//       // pois:filteredPOIs,
//     });
//     // console.log("filteredPOIs",filteredPOIs )
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch POIs",
//     });
//   }
// }

import { Request, Response } from "express";
import { getPOIs, Theme } from "../services/poi.service";
import { getRoute } from "../services/graphhopper.service";
import { sampleRoute } from "../services/experienceServices/routeSampler.service";

export async function poiController(req: Request, res: Response) {
  try {
    const { start, end, theme, vehicle } = req.body;

    const routes = await getRoute(start, end, vehicle);

    if (routes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    const fastestRoute = routes[0];

    const samplePoints = sampleRoute(routes[0].coordinates,fastestRoute.distance);

    const pois = await getPOIs(
      samplePoints,
      theme as Theme
    );

    res.status(200).json({
      success: true,
      pois,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch POIs",
    });
  }
}