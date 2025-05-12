/*
  Warnings:

  - You are about to drop the column `businessId` on the `Periode` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `ProductionCost` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Periode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductionCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SellingCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Periode" DROP CONSTRAINT "Periode_businessId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionCost" DROP CONSTRAINT "ProductionCost_businessId_fkey";

-- DropForeignKey
ALTER TABLE "SellingCost" DROP CONSTRAINT "SellingCost_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_businessId_fkey";

-- AlterTable
ALTER TABLE "Periode" DROP COLUMN "businessId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductionCost" DROP COLUMN "businessId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellingCost" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "businessId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Business";

-- AddForeignKey
ALTER TABLE "Periode" ADD CONSTRAINT "Periode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCost" ADD CONSTRAINT "ProductionCost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingCost" ADD CONSTRAINT "SellingCost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
