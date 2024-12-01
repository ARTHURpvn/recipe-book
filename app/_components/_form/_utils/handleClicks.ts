"use client";
import { CategoryEnum, IngredientEnum, QuantityEnum } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export const handleAddCategory = (
  categories: { name: CategoryEnum }[],
  setCategories: Dispatch<SetStateAction<{ name: CategoryEnum }[]>>,
  category: CategoryEnum,
  setError: Dispatch<SetStateAction<string>>
) => {
  let error = "";
  if (!category) {
    error = "Por favor, preencha a categoria";
    setError(error);
    return;
  }

  setError("");

  if (!categories.some((cat) => cat.name === category)) {
    setCategories([...categories, { name: category }]);
  }
};

export const handleDeleteCategory = (
  categories: { name: CategoryEnum }[],
  setCategories: Dispatch<SetStateAction<{ name: CategoryEnum }[]>>,
  name: CategoryEnum
) => {
  setCategories(categories.filter((category) => category.name !== name));
};

export const handleAddIngredient = (
  ingredients: {
    ingredient: IngredientEnum;
    quantity: string;
    quantity_type: QuantityEnum;
  }[],
  setIngredients: Dispatch<
    SetStateAction<
      {
        ingredient: IngredientEnum;
        quantity: string;
        quantity_type: QuantityEnum;
      }[]
    >
  >,
  ingredient: {
    ingredient: IngredientEnum;
    quantity: string;
    quantity_type: QuantityEnum;
  },
  setErrors: Dispatch<SetStateAction<string>>
) => {
  let error = "";

  if (ingredient.quantity === "") {
    error = "Por favor, preencha a quantidade";
    setErrors(error);
    return;
  }
  if (!ingredient.quantity_type) {
    error = "Por favor, preencha o tipo de quantidade";
    setErrors(error);
    return;
  }
  if (!ingredient.ingredient) {
    error = "Por favor, preencha o ingrediente";
    setErrors(error);
    return;
  }

  setErrors("");

  if (!ingredients.some((ing) => ing.ingredient === ingredient.ingredient)) {
    setIngredients([...ingredients, ingredient]);
  }
};

export const handleDeleteIngredient = (
  ingredients: {
    ingredient: IngredientEnum;
    quantity: string;
    quantity_type: QuantityEnum;
  }[],
  setIngredients: Dispatch<
    SetStateAction<
      { ingredient: IngredientEnum; quantity: string; quantity_type: QuantityEnum }[]
    >
  >,
  ingredient: { ingredient: IngredientEnum; quantity: string; quantity_type: QuantityEnum }
) => {
  setIngredients(
    ingredients.filter((ing) => ing.ingredient !== ingredient.ingredient)
  );
};

export const handleSubmit = () => {};
