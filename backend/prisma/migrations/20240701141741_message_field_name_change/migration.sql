/*
  Warnings:

  - You are about to drop the column `user1Id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Message` table. All the data in the column will be lost.
  - Added the required column `recipient` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "recipient" INTEGER NOT NULL,
ADD COLUMN     "sender" INTEGER NOT NULL;
