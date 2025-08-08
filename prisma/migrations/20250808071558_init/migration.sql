-- CreateTable
CREATE TABLE "public"."Vocabulary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "examples" TEXT[],
    "tags" TEXT[],
    "notes" TEXT[],
    "dayId" TEXT NOT NULL,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Day" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_name_key" ON "public"."Day"("name");

-- CreateIndex
CREATE INDEX "idx_day_name" ON "public"."Day"("name");

-- AddForeignKey
ALTER TABLE "public"."Vocabulary" ADD CONSTRAINT "Vocabulary_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
