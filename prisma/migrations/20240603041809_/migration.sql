-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hardware_version" VARCHAR,
ADD COLUMN     "os" "OSType" DEFAULT 'WEB',
ADD COLUMN     "software_version" VARCHAR,
ADD COLUMN     "user_device_token" VARCHAR;
