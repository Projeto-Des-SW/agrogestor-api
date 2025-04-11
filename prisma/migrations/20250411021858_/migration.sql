-- DropForeignKey
ALTER TABLE "ProductionEntry" DROP CONSTRAINT "ProductionEntry_productionLogId_fkey";

-- AddForeignKey
ALTER TABLE "ProductionEntry" ADD CONSTRAINT "ProductionEntry_productionLogId_fkey" FOREIGN KEY ("productionLogId") REFERENCES "ProductionLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
