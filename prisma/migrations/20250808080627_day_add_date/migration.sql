/*
  Warnings:

  - Added the required column `date` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Day" ADD COLUMN     "date" VARCHAR(10) NOT NULL;
