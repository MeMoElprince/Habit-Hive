-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inavtive');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Active';
