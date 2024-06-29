/*
  Warnings:

  - You are about to drop the column `author` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1Id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "author",
DROP COLUMN "chatId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chats" INTEGER[];

-- DropTable
DROP TABLE "Chat";
