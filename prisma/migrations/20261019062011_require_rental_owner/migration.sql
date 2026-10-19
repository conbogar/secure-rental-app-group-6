/*
  Warnings:

  - Made the column `userId` on table `Rental` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_userId_fkey";

-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
