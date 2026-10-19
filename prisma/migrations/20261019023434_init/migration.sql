-- CreateTable
CREATE TABLE "Rental" (
    "id" SERIAL NOT NULL,
    "propertyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Interested',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);
