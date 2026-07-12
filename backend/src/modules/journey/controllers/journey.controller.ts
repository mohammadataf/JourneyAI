import { Request, Response } from "express";

import { asyncHandler } from "../../../utils/asyncHandler";

import { createJourneySchema } from "../validators/journey.validator";

import { createJourneyService } from "../services/journey.service";



export const createJourney = asyncHandler(

    async (

        req: Request,

        res: Response

    ) => {

        const validationResult =
            createJourneySchema.parse(
                req.body
            );


        const journey =
            await createJourneyService(

                req.user!.id,

                validationResult

            );


        res.status(201).json({

            success: true,

            message: "Journey created successfully",

            data: journey

        });

    }

);