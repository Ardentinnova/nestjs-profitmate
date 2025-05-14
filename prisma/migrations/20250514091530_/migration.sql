/*
  Warnings:

  - You are about to drop the column `periodesId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `periodId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_periodesId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "periodesId",
ADD COLUMN     "periodId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
