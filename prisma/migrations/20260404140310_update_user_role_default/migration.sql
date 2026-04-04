-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'VIEWER';

-- CreateIndex
CREATE INDEX "Record_userId_idx" ON "Record"("userId");
