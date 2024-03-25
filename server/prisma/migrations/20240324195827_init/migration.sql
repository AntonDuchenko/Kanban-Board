/*
  Warnings:

  - You are about to drop the column `createAt` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Status" DROP COLUMN "createAt";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createAt";
