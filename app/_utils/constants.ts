import { CategoryEnum, IngredientEnum, QuantityEnum } from "@prisma/client";

export type RecipeProps = {
  id: number;
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  instructions: string;
  photo: string;
  authorId: string;
  ingredients: Array<{
    ingredientId: number;
    quantity: string;
    quantity_type: string;
  }>;
  categories: Array<{
    id: number;
    categoryId: number;
  }>;
};

export const QUANTITY_TYPE = ["UNIT", "LITRE", "CUP", "BAR"];
export const QUANTITY_TYPE_LABEL: Record<string, string> = {
  [QuantityEnum.UNIT]: "Unidade",
  [QuantityEnum.LITRE]: "Litro",
  [QuantityEnum.CUP]: "Xícara",
  [QuantityEnum.BAR]: "Barra",
};

export const CATEGORIES = ["LUNCH", "DESSERT", "DINNER"];
export const CATEGORIES_LABELS: Record<string, string> = {
  [CategoryEnum.LUNCH]: "Lanche",
  [CategoryEnum.DESSERT]: "Sobremesa",
  [CategoryEnum.DINNER]: "Almoco",
};
export const CATEGORY_BY_ID: Record<number, string> = {
  [1]: "Lanche",
  [2]: "Sobremesa",
  [3]: "Almoco",
};


// constantes dos ingredientes
export const INGREDIENTS = [
  "SUGAR",
  "FLUOR",
  "MILK",
  "EGG",
  "BUTTER",
  "SALT",
  "CHOCOLATE",
  "OIL",
  "CREAM",
  "FERMENT",
  "CHOCOLATE_POWDER",
  "CREAM_MILK",
];
export const INGREDIENTS_LABELS: Record<string, string> = {
  [IngredientEnum.SUGAR]: "Açúcar",
  [IngredientEnum.FLUOR]: "Farínha",
  [IngredientEnum.MILK]: "Leite",
  [IngredientEnum.EGG]: "Ovo",
  [IngredientEnum.BUTTER]: "Manteíga",
  [IngredientEnum.SALT]: "Sal",
  [IngredientEnum.CHOCOLATE]: "Chocolate",
  [IngredientEnum.CREAM]: "Creme",
  [IngredientEnum.CHOCOLATE_POWDER]: "Chocolate em pó",
  [IngredientEnum.OIL]: "Óleo",
  [IngredientEnum.MILK_CREAM]: "Creme de Leite",
  [IngredientEnum.FERMENT]: "Fermento",
};
export const INGREDIENTS_BY_ID: Record<number, string> = {
  [1]: "Açúcar",
  [2]: "Farínha",
  [3]: "Leite",
  [4]: "Ovo",
  [5]: "Manteíga",
  [6]: "Sal",
  [7]: "Chocolate",
  [8]: "Creme",
  [9]: "Chocolate em pó",
  [10]: "Óleo",
  [11]: "Creme de Leite",
  [12]: "Fermento",
};
