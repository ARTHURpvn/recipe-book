/*
  Warnings:

  - You are about to drop the column `ingredient_type` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photo` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_authorId_fkey";

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "ingredient_type";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "photo" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "instructions" SET NOT NULL,
ALTER COLUMN "instructions" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "IngredientTypeEnum";
