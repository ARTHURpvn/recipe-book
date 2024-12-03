"use server";

import { db } from "../_lib/prisma";

export const getAllRecipes = async () => {
  const recipes = await db.recipe.findMany();
  const ingredients = await Promise.all(
    recipes.map(async (recipe) => {
      const ingredients = await db.recipeIngredient.findMany({
        where: {
          recipeId: recipe.id,
        },
      });

      return ingredients;
    })
  );

  const categories = await Promise.all(
    recipes.map(async (recipe) => {
      const categories = await db.recipeCategory.findMany({
        where: {
          recipeId: recipe.id,
        },
      });
      return categories;
    })
  );

  const teste = recipes.map((recipe, index) => {
    return {
      ...recipe,
      ingredients: ingredients[index],
      categories: categories[index],
    };
  });

  return teste;
};

export const getRecipeById = async (id: number) => {
  const recipe = await db.recipe.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
      categories: true,
    },
  })

  return recipe
};