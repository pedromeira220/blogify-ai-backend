-- CreateEnum
CREATE TYPE "PrimaryColor" AS ENUM ('PURPLE', 'ORANGE', 'BLUE', 'GREEN', 'YELLOW');

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "primaryColor" "PrimaryColor" NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
