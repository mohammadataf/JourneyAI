import authRouter from "./modules/auth/routes/auth.routes";
import mapRouter from "./modules/map/routes/map.route";
// import searchRoute from "./modules/map/routes/search.route";

import routeRoutes from "./modules/map/routes/route.routes";
import viaRouteRoutes from "./modules/map/routes/viaRoute.routes";
import poiRoutes from "./modules/map/routes/poi.routes";

import scenicRoutes from "./modules/map/routes/experienceRoutes/scenic.routes";

 
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/map", mapRouter);
// app.use("/api/v1/search", searchRoute);

app.use("/api", routeRoutes);
app.use("/api", viaRouteRoutes);
app.use("/api", poiRoutes);

app.use("/api", scenicRoutes);

/**
 * Health Check Route
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "JourneyAI Backend is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

export default app;