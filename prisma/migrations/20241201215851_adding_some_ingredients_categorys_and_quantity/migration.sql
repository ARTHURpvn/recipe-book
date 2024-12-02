/*
  Warnings:

  - The values [LUNCH,DINNER] on the enum `CategoryEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [FLUOR,CREAM,FERMENT,CHOCOLATE_POWDER] on the enum `IngredientEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [LITRE,SOUP_SPOON,BOX,BAR] on the enum `QuantityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryEnum_new" AS ENUM ('GRAINS', 'DAIRY', 'MEATS', 'OILS_FATS', 'VEGETABLES', 'FRUITS', 'PASTA', 'BREADS', 'LEGUMES', 'DESSERT');
ALTER TABLE "categories" ALTER COLUMN "name" TYPE "CategoryEnum_new" USING ("name"::text::"CategoryEnum_new");
ALTER TYPE "CategoryEnum" RENAME TO "CategoryEnum_old";
ALTER TYPE "CategoryEnum_new" RENAME TO "CategoryEnum";
DROP TYPE "CategoryEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "IngredientEnum_new" AS ENUM ('CORNSTARCH', 'WHEAT_FLOUR', 'REFINED_SUGAR', 'SWEET_CORN', 'SUGAR', 'ROYAL_BAKING_POWDER', 'EGG', 'BUTTER', 'BEER', 'SALT', 'MILK', 'PLUM', 'RAISINS', 'CINNAMON', 'GROUND_CINNAMON', 'UNREFINED_SUGAR', 'WATER', 'CORNMEAL', 'CARROT', 'OIL', 'CHOCOLATE', 'SEMI_SWEET_CHOCOLATE', 'SPRINKLES', 'COFFEE', 'JELLY', 'HONEY', 'EGG_YOLK', 'EGG_WHITE', 'LIQUOR', 'MARGARINE', 'COCONUT_MILK', 'COCONUT_FLOUR', 'COCONUT', 'SOCOCO', 'HOMINY_CORNMEAL', 'CHEESE', 'GRATED_CHEESE', 'MINAS_CHEESE', 'BAKING_SODA', 'FAT', 'YOGURT', 'CLOVES', 'ORANGE_JUICE', 'CONDENSED_MILK', 'BUTTER_MILK', 'CASSAVA', 'HEAVY_CREAM', 'TAPIOCA_FLOUR', 'SWEET_TAPIOCA_FLOUR', 'SOUR_TAPIOCA_FLOUR', 'MILK_CREAM', 'FENNEL', 'SAFFRON', 'BLACK_PEPPER', 'SOY_SAUCE', 'FRESH_GINGER', 'RICE_VINEGAR', 'NUTMEG', 'TURMERIC', 'PAPRIKA', 'GARLIC', 'ONION', 'TOMATO', 'BAT_LEAF', 'PARSLEY', 'CILANTRO', 'OLIVE_OIL');
ALTER TABLE "ingredients" ALTER COLUMN "name" TYPE "IngredientEnum_new" USING ("name"::text::"IngredientEnum_new");
ALTER TYPE "IngredientEnum" RENAME TO "IngredientEnum_old";
ALTER TYPE "IngredientEnum_new" RENAME TO "IngredientEnum";
DROP TYPE "IngredientEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "QuantityEnum_new" AS ENUM ('GRAMS', 'KILOGRAMS', 'MILLILITERS', 'LITERS', 'TABLESPOON', 'TEASPOON', 'CUP', 'GLASS', 'PINCH', 'UNIT', 'PIECE', 'SLICE', 'CAN');
ALTER TABLE "recipe_ingredients" ALTER COLUMN "quantity_type" TYPE "QuantityEnum_new" USING ("quantity_type"::text::"QuantityEnum_new");
ALTER TYPE "QuantityEnum" RENAME TO "QuantityEnum_old";
ALTER TYPE "QuantityEnum_new" RENAME TO "QuantityEnum";
DROP TYPE "QuantityEnum_old";
COMMIT;
