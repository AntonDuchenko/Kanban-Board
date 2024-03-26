/*
  Warnings:

  - Added the required column `createAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL;
