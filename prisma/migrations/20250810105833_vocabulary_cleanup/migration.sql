/*
  Warnings:

  - You are about to drop the column `examples` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Vocabulary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Vocabulary" DROP COLUMN "examples",
DROP COLUMN "notes",
DROP COLUMN "tags";
