-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "IngredientEnum" ADD VALUE 'CHOCOLATE_POWDER';
ALTER TYPE "IngredientEnum" ADD VALUE 'MILK_CREAM';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QuantityEnum" ADD VALUE 'BOX';
ALTER TYPE "QuantityEnum" ADD VALUE 'BAR';
