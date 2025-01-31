/*
  Warnings:

  - You are about to drop the column `catalogCC` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `orders` on the `Accessories` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Accessories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePaymentId]` on the table `PaymentHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentUrl` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accessories" DROP COLUMN "catalogCC",
DROP COLUMN "orders",
DROP COLUMN "payment",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "documentUrl" TEXT NOT NULL,
ADD COLUMN     "paymentHistoryId" TEXT;

-- AlterTable
ALTER TABLE "PaymentHistory" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "stripePaymentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AccessoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessoryOrderItem" (
    "id" TEXT NOT NULL,
    "accessoryItemId" TEXT NOT NULL,
    "accessoriesId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessoryOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentHistory_stripePaymentId_key" ON "PaymentHistory"("stripePaymentId");

-- AddForeignKey
ALTER TABLE "AccessoryOrderItem" ADD CONSTRAINT "AccessoryOrderItem_accessoriesId_fkey" FOREIGN KEY ("accessoriesId") REFERENCES "Accessories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
