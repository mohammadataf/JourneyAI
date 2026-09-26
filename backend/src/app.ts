import authRouter from "./modules/auth/routes/auth.routes";
<<<<<<< HEAD
import mapRouter from "./modules/map/routes/map.route";
// import searchRoute from "./modules/map/routes/search.route";

import routeRoutes from "./modules/map/routes/route.routes";
import viaRouteRoutes from "./modules/map/routes/viaRoute.routes";
import poiRoutes from "./modules/map/routes/poi.routes";

import scenicRoutes from "./modules/map/routes/experienceRoutes/experience.routes";
import exploreRoutes from "./modules/explore/routes/explore.routes";
import tripPlannerRoutes from "./modules/tripPlanner/routes/tripPlannerRoutes";

 
=======
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
<<<<<<< HEAD
=======
import errorMiddleware from "./middlewares/error.middleware";
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json());
<<<<<<< HEAD
app.use(cors()); 
=======
app.use(cors());
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
app.use(helmet());
app.use(morgan("dev"));


<<<<<<< HEAD
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/map", mapRouter);
// app.use("/api/v1/search", searchRoute);

app.use("/api", routeRoutes);
app.use("/api", viaRouteRoutes);
app.use("/api", poiRoutes);

app.use("/api", scenicRoutes);



// explore routes
app.use("/api/explore", exploreRoutes);



// trip planner
app.use("/api/trip-planner", tripPlannerRoutes);
=======

app.use("/api/v1/auth", authRouter);
app.use(errorMiddleware);
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f

/**
 * Health Check Route
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
<<<<<<< HEAD
    message: "JourneyAI Backend is running 🚀",
=======
    message: "JourneyAI Backend is running ",
>>>>>>> 19dd3caf8aaf39ddb60ca7d66f0c719ccfff5e9f
    timestamp: new Date().toISOString(),
  });
});

export default app;