/*
  Warnings:

  - You are about to drop the column `mbti` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mbti",
ADD COLUMN     "blood_type_id" INTEGER,
ADD COLUMN     "mbti_id" INTEGER,
ADD COLUMN     "weekly_fortune_id" INTEGER;

-- DropEnum
DROP TYPE "MBTI";

-- CreateTable
CREATE TABLE "InfoMbti" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoMbti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoWeeklyFortune" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoWeeklyFortune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoBloodType" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoBloodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoKoreaCity" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoKoreaCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoKoreaResidenceDistrict" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoKoreaResidenceDistrict_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mbti_id_fkey" FOREIGN KEY ("mbti_id") REFERENCES "InfoMbti"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_blood_type_id_fkey" FOREIGN KEY ("blood_type_id") REFERENCES "InfoBloodType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_weekly_fortune_id_fkey" FOREIGN KEY ("weekly_fortune_id") REFERENCES "InfoWeeklyFortune"("id") ON DELETE SET NULL ON UPDATE CASCADE;
