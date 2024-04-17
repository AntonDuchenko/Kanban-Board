/*
  Warnings:

  - You are about to drop the column `actions` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `actions` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Status" DROP COLUMN "actions";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "actions";
