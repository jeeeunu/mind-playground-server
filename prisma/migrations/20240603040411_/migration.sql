/*
  Warnings:

  - You are about to drop the column `created_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `PostComment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MBTI" AS ENUM ('ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ');

-- CreateEnum
CREATE TYPE "OSType" AS ENUM ('IOS', 'ANDROID', 'WEB');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" "UserGender" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "is_alarm_settings" BOOLEAN,
ADD COLUMN     "mbti" "MBTI",
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "social_id" TEXT,
ADD COLUMN     "state" "UserState" NOT NULL DEFAULT 'ENABLED',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "type" SET DEFAULT 'GOOGLE';

-- CreateTable
CREATE TABLE "AppVersion" (
    "id" SERIAL NOT NULL,
    "os" "OSType" NOT NULL,
    "version" VARCHAR NOT NULL,
    "type" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "is_expiration" BOOLEAN NOT NULL DEFAULT false,
    "ip" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlocked" (
    "id" SERIAL NOT NULL,
    "reason" VARCHAR NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserBlocked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlocked" ADD CONSTRAINT "UserBlocked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
