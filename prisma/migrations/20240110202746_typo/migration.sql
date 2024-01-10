/*
  Warnings:

  - You are about to drop the column `likesConunt` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "likesConunt",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0;
