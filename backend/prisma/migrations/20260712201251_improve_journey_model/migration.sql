/*
  Warnings:

  - You are about to drop the column `destination` on the `Journey` table. All the data in the column will be lost.
  - You are about to drop the column `startLocation` on the `Journey` table. All the data in the column will be lost.
  - Added the required column `destinationName` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originName` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JourneyStatus" AS ENUM ('PLANNING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "destination",
DROP COLUMN "startLocation",
ADD COLUMN     "destinationName" TEXT NOT NULL,
ADD COLUMN     "originName" TEXT NOT NULL,
ADD COLUMN     "status" "JourneyStatus" NOT NULL DEFAULT 'PLANNING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
