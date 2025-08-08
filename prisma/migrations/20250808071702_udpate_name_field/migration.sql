/*
  Warnings:

  - Changed the type of `name` on the `Day` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Day" DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Day_name_key" ON "public"."Day"("name");

-- CreateIndex
CREATE INDEX "idx_day_name" ON "public"."Day"("name");
