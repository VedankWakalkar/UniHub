-- CreateEnum
CREATE TYPE "PrintStatus" AS ENUM ('PENDING', 'PRINTING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "color" BOOLEAN NOT NULL,
    "oneSidePrint" BOOLEAN NOT NULL,
    "token" TEXT NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "orderTrack" "PrintStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accessories" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "catalogCC" TEXT NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "orders" JSONB NOT NULL,

    CONSTRAINT "Accessories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canteen" (
    "id" TEXT NOT NULL,
    "catalogFood" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "foodItems" JSONB NOT NULL,
    "orderTrack" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "timing" TIMESTAMP(3) NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Canteen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableReservation" (
    "id" TEXT NOT NULL,
    "tableNo" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "timeSlot" TIMESTAMP(3) NOT NULL,
    "canteenId" TEXT NOT NULL,

    CONSTRAINT "TableReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL,
    "receivedTime" TIMESTAMP(3),

    CONSTRAINT "DocumentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodOrderHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "itemQuantity" JSONB NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL,
    "receivedTime" TIMESTAMP(3),

    CONSTRAINT "FoodOrderHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_token_key" ON "Document"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Accessories_documentId_key" ON "Accessories"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Canteen_token_key" ON "Canteen"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TableReservation_canteenId_key" ON "TableReservation"("canteenId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accessories" ADD CONSTRAINT "Accessories_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableReservation" ADD CONSTRAINT "TableReservation_canteenId_fkey" FOREIGN KEY ("canteenId") REFERENCES "Canteen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentHistory" ADD CONSTRAINT "DocumentHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodOrderHistory" ADD CONSTRAINT "FoodOrderHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
