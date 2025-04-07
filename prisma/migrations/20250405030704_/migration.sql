-- CreateEnum
CREATE TYPE "Period" AS ENUM ('MORNING', 'AFTERNOON');

-- CreateTable
CREATE TABLE "ProductionEntry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "period" "Period" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productionLogId" INTEGER NOT NULL,

    CONSTRAINT "ProductionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionLog" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "ProductionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductionEntry_productionLogId_idx" ON "ProductionEntry"("productionLogId");

-- CreateIndex
CREATE INDEX "ProductionLog_memberId_idx" ON "ProductionLog"("memberId");

-- AddForeignKey
ALTER TABLE "ProductionEntry" ADD CONSTRAINT "ProductionEntry_productionLogId_fkey" FOREIGN KEY ("productionLogId") REFERENCES "ProductionLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionLog" ADD CONSTRAINT "ProductionLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
