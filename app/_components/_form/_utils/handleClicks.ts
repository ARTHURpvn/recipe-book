import { Dispatch, SetStateAction } from "react";

export const handleAddCategory = (
  categories: { name: string }[],
  setCategories: Dispatch<SetStateAction<{ name: string }[]>>,
  category: string
) => {
  if (!categories.some((cat) => cat.name === category)) {
    setCategories([...categories, { name: category }]);
  }
};

export const handleDeleteCategory = (
  categories: { name: string }[],
  setCategories: Dispatch<SetStateAction<{ name: string }[]>>,
  name: string
) => {
  setCategories(categories.filter((category) => category.name !== name));
};

export const handleAddIngredient = (
  ingredients: { ingredient: string; quantity: string; quantity_type: string }[],
  setIngredients: Dispatch<
    SetStateAction<{ ingredient: string; quantity: string; quantity_type: string }[]>
  >,
  ingredient: { ingredient: string; quantity: string; quantity_type: string }
) => {
  setIngredients([...ingredients, ingredient]);
};
