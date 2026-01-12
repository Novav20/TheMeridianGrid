-- DropIndex
DROP INDEX "telemetry_time_idx";

-- CreateIndex
CREATE INDEX "telemetry_time_idx" ON "telemetry"("time");
