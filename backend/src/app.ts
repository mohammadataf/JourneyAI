import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./modules/auth/routes/auth.routes";
import journeyRouter from "./modules/journey/routes/journey.routes";

import errorMiddleware from "./middlewares/error.middleware";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));



app.use("/api/v1/auth", authRouter);

app.use("/api/v1/journeys", journeyRouter);

app.use(errorMiddleware);

/**
 * Health Check Route
 */
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "JourneyAI Backend is running ",
    timestamp: new Date().toISOString(),
  });
});

export default app;