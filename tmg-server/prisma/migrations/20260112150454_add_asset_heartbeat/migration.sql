-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "heartbeatTimeout" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "lastSeen" TIMESTAMP(3);
