/*
  Warnings:

  - You are about to drop the `_RecipeCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecipeIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `name` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IngredientEnum" AS ENUM ('SUGAR', 'FLUOR', 'MILK', 'EGG', 'BUTTER', 'SALT', 'CHOCOLATE', 'OIL', 'CREAM', 'FERMENT');

-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('LUNCH', 'DESSERT', 'DINNER');

-- DropForeignKey
ALTER TABLE "_RecipeCategories" DROP CONSTRAINT "_RecipeCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeCategories" DROP CONSTRAINT "_RecipeCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeIngredients" DROP CONSTRAINT "_RecipeIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeIngredients" DROP CONSTRAINT "_RecipeIngredients_B_fkey";

-- DropIndex
DROP INDEX "categories_name_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "name" "CategoryEnum" NOT NULL;

-- DropTable
DROP TABLE "_RecipeCategories";

-- DropTable
DROP TABLE "_RecipeIngredients";

-- DropTable
DROP TABLE "ingredients";

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredient" "IngredientEnum" NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRecipe_AB_unique" ON "_CategoryToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRecipe_B_index" ON "_CategoryToRecipe"("B");

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
