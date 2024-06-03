-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birth" TIMESTAMP(3),
ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "job_id" INTEGER,
ADD COLUMN     "residence_district_id" INTEGER,
ADD COLUMN     "sns_url" VARCHAR;

-- CreateTable
CREATE TABLE "InfoJob" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "InfoJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "InfoJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "InfoKoreaCity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_residence_district_id_fkey" FOREIGN KEY ("residence_district_id") REFERENCES "InfoKoreaResidenceDistrict"("id") ON DELETE SET NULL ON UPDATE CASCADE;
