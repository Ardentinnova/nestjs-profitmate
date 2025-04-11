/*
  Warnings:

  - You are about to drop the column `businessId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `workerId` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "workerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "businessId";

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
