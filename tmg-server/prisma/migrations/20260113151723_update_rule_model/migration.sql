/*
  Warnings:

  - You are about to drop the column `expression` on the `rules` table. All the data in the column will be lost.
  - Added the required column `metric` to the `rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator` to the `rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `rules` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleOperator" AS ENUM ('GT', 'LT', 'EQ', 'GTE', 'LTE');

-- AlterTable
ALTER TABLE "rules" DROP COLUMN "expression",
ADD COLUMN     "metric" TEXT NOT NULL,
ADD COLUMN     "operator" "RuleOperator" NOT NULL,
ADD COLUMN     "threshold" DOUBLE PRECISION NOT NULL;
