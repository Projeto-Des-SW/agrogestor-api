/*
  Warnings:

  - You are about to drop the column `userId` on the `SaleOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_saleOrderId_fkey";

-- DropForeignKey
ALTER TABLE "SaleOrder" DROP CONSTRAINT "SaleOrder_userId_fkey";

-- DropIndex
DROP INDEX "SaleOrder_userId_idx";

-- AlterTable
ALTER TABLE "SaleOrder" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "ProductPrice_productId_groupId_date_price_idx" ON "ProductPrice"("productId", "groupId", "date", "price");

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_saleOrderId_fkey" FOREIGN KEY ("saleOrderId") REFERENCES "SaleOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
