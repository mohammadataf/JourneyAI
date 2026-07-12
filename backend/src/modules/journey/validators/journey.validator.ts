import { z } from "zod";

export const createJourneySchema = z.object({

    originName: z
        .string()
        .trim()
        .min(2, "Origin is required")
        .max(100),

    destinationName: z
        .string()
        .trim()
        .min(2, "Destination is required")
        .max(100),

    journeyType: z.enum([
        "FAST",
        "SCENIC",
        "EXPLORE"
    ]),

    interests: z
        .array(z.string().trim().min(1))
        .default([])

});