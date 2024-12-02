import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ingredients = [
    "CORNSTARCH",
    "WHEAT_FLOUR",
    "REFINED_SUGAR",
    "SWEET_CORN",
    "SUGAR",
    "ROYAL_BAKING_POWDER",
    "EGG",
    "BUTTER",
    "BEER",
    "SALT",
    "MILK",
    "PLUM",
    "RAISINS",
    "CINNAMON",
    "GROUND_CINNAMON",
    "UNREFINED_SUGAR",
    "WATER",
    "CORNMEAL",
    "CARROT",
    "OIL",
    "CHOCOLATE",
    "SEMI_SWEET_CHOCOLATE",
    "SPRINKLES",
    "COFFEE",
    "JELLY",
    "HONEY",
    "EGG_YOLK",
    "EGG_WHITE",
    "LIQUOR",
    "MARGARINE",
    "COCONUT_MILK",
    "COCONUT_FLOUR",
    "COCONUT",
    "SOCOCO",
    "HOMINY_CORNMEAL",
    "CHEESE",
    "GRATED_CHEESE",
    "MINAS_CHEESE",
    "BAKING_SODA",
    "FAT",
    "YOGURT",
    "CLOVES",
    "ORANGE_JUICE",
    "CONDENSED_MILK",
    "BUTTER_MILK",
    "CASSAVA",
    "HEAVY_CREAM",
    "TAPIOCA_FLOUR",
    "SWEET_TAPIOCA_FLOUR",
    "SOUR_TAPIOCA_FLOUR",
    "MILK_CREAM",
    "FENNEL",
    "SAFFRON",
    "BLACK_PEPPER",
    "SOY_SAUCE",
    "FRESH_GINGER",
    "RICE_VINEGAR",
    "NUTMEG",
    "TURMERIC",
    "PAPRIKA",
    "GARLIC",
    "ONION",
    "TOMATO",
    "BAT_LEAF",
    "PARSLEY",
    "CILANTRO",
    "OLIVE_OIL",
  ];

  const categories = [
    "GRAINS",
    "DAIRY",
    "MEATS",
    "OILS_FATS",
    "VEGETABLES",
    "FRUITS",
    "PASTA",
    "BREADS",
    "LEGUMES",
    "DESSERT",
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient },
      update: {},
      create: { name: ingredient },
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
