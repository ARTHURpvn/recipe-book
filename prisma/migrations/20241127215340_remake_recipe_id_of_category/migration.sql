/*
  Warnings:

  - The `recipeId` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_recipeId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "recipeId",
ADD COLUMN     "recipeId" INTEGER;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
