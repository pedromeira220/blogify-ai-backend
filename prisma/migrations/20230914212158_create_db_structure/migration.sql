/*
  Warnings:

  - You are about to drop the column `creationDate` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColor` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `creation_date` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary_color` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "creationDate",
DROP COLUMN "primaryColor",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "primary_color" "PrimaryColor" NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "local_image_file_name" TEXT,
    "searcheable_image_search_term" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,
    "thumbnail_id" TEXT NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
