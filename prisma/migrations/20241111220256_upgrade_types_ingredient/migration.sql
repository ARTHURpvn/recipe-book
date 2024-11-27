/*
  Warnings:

  - Added the required column `ingredient_type` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_type` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IngredientTypeEnum" AS ENUM ('DOUGH', 'TOPPING', 'FILLING');

-- CreateEnum
CREATE TYPE "QuantityEnum" AS ENUM ('CUP', 'UNIT', 'LITRE', 'SOUP_SPOON');

-- AlterTable
ALTER TABLE "recipe_ingredients" ADD COLUMN     "ingredient_type" "IngredientTypeEnum" NOT NULL,
ADD COLUMN     "quantity_type" "QuantityEnum" NOT NULL;
