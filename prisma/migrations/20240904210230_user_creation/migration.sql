-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "facebookLink" TEXT,
    "twitterLink" TEXT,
    "otp" TEXT,
    "numberOfBadges" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
