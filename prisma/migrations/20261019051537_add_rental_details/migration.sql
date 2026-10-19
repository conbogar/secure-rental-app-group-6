-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "documentNotes" TEXT,
ADD COLUMN     "listingUrl" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ADD COLUMN     "viewingDate" TIMESTAMP(3);
