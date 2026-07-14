import prisma from "../../../config/prisma";

import type { JourneyType } from "../../../generated/prisma/enums";

interface CreateJourneyInput {

    originName: string;

    destinationName: string;

    journeyType: JourneyType;

    interests: string[];

}

export const createJourneyService = async (

    userId: string,

    data: CreateJourneyInput

) => {

    const journey = await prisma.journey.create({

        data: {

            userId,

            originName: data.originName,

            destinationName: data.destinationName,

            journeyType: data.journeyType,

            interests: data.interests

        }

    });

    return journey;

};
export const getUserJourneysService = async (

    userId: string

) => {

    const journeys = await prisma.journey.findMany({

        where: {

            userId

        },

        orderBy: {

            createdAt: "desc"

        }

    });

    return journeys;

};