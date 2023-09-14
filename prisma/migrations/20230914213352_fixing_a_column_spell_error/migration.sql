/*
  Warnings:

  - You are about to drop the column `searcheable_image_search_term` on the `images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "searcheable_image_search_term",
ADD COLUMN     "searchable_image_search_term" TEXT;
