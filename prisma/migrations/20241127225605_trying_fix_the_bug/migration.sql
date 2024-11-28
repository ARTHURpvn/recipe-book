/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Made the column `recipeId` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "recipeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_recipeId_name_key" ON "categories"("recipeId", "name");
