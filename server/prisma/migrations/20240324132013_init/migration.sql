-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actions" JSONB[],

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "priority" "Priority" NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actions" JSONB[],

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_title_key" ON "Status"("title");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
