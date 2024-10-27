/*
  Warnings:

  - You are about to drop the column `theater_id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `theater_id` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `movie_theater_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "theater_id",
ADD COLUMN     "movie_theater_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "theater_id";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "total_rooms" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "has_3d" BOOLEAN NOT NULL DEFAULT false,
    "has_imax" BOOLEAN NOT NULL DEFAULT false,
    "has_dolby_atmos" BOOLEAN NOT NULL DEFAULT false,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "website_url" TEXT,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
