/*
  Warnings:

  - The primary key for the `FuelLog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FuelLog" DROP CONSTRAINT "FuelLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FuelLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FuelLog_id_seq";
