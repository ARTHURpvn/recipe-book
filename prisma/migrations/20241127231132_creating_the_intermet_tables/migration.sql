/*
  Warnings:

  - You are about to drop the column `recipeId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `ingredient` on the `recipe_ingredients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId,ingredientId]` on the table `recipe_ingredients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ingredientId` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_recipeId_fkey";

-- DropIndex
DROP INDEX "categories_recipeId_name_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "recipeId";

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "ingredient",
ADD COLUMN     "ingredientId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" "IngredientEnum" NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_categories" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "recipe_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_categories_recipeId_categoryId_key" ON "recipe_categories"("recipeId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredients_recipeId_ingredientId_key" ON "recipe_ingredients"("recipeId", "ingredientId");

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_categories" ADD CONSTRAINT "recipe_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

SELECT * FROM recipe_ingredients WHERE "ingredientId" IS NULL;
UPDATE recipe_ingredients SET "ingredientId" = 1 WHERE "ingredientId" IS NULL;
