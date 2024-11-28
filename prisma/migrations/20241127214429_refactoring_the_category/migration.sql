/*
  Warnings:

  - You are about to drop the `_CategoryToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipeId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToRecipe";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
