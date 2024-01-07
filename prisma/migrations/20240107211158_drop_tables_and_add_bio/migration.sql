/*
  Warnings:

  - You are about to drop the column `followersCount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followersCount",
DROP COLUMN "followingCount",
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'Gamer and content creator at ClipIt!';
