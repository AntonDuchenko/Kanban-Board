/*
  Warnings:

  - The `description` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `action` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "action" TEXT NOT NULL,
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];
