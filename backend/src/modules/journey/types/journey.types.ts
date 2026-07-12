import type { JourneyType } from "../../../generated/prisma/enums";

export interface CreateJourneyInput {

    originName: string;

    destinationName: string;

    journeyType: JourneyType;

    interests: string[];

}