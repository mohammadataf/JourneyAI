/*
  Warnings:

  - Changed the type of `journeyType` on the `Journey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JourneyType" AS ENUM ('FAST', 'SCENIC', 'EXPLORE');

-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "journeyType",
ADD COLUMN     "journeyType" "JourneyType" NOT NULL;
