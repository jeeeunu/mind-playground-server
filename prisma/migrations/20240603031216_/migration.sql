-- CreateEnum
CREATE TYPE "UserAuthType" AS ENUM ('DEFAULT', 'KAKAO', 'GOOGLE', 'NAVER', 'APPLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserAuthType" NOT NULL DEFAULT 'DEFAULT';
