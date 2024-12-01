"use server";

import { CategoryEnum, IngredientEnum, QuantityEnum } from "@prisma/client";
import { db } from "../_lib/prisma";

type RecipeProps = {
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  instructions: string;
  photo: File | string;
  authorId: string;
  ingredients: {
    quantity: string;
    quantity_type: QuantityEnum;
    ingredient: IngredientEnum;
  }[];
  categories: {
    name: CategoryEnum;
  }[];
};

export const createRecipe = async (data: RecipeProps) => {
  // Criar a receita
  const recipe = await db.recipe.create({
    data: {
      title: data.title,
      description: data.description,
      servings: data.servings,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      instructions: data.instructions,
      photo: data.photo,
      authorId: data.authorId,
    },
  });

  // Para cada ingrediente, buscar o ID baseado no nome e depois associá-lo à receita
  const ingredients = await Promise.all(
    data.ingredients.map(async (ingredient) => {
      // Buscar o id do ingrediente com base no nome
      const ingredientRecord = await db.ingredient.findUnique({
        where: {
          name: ingredient.ingredient, // 'ingredient.ingredient' é o nome do ingrediente enviado do frontend
        },
      });

      if (!ingredientRecord) {
        throw new Error(`Ingrediente ${ingredient.ingredient} não encontrado`);
      }

      return db.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredientRecord.id,
          quantity: ingredient.quantity,
          quantity_type: ingredient.quantity_type,
        },
      });
    })
  );

  const categories = await Promise.all(
    data.categories.map(async (category) => {
      // Buscar o id da categoria com base no nome
      const categoryRecord = await db.category.findUnique({
        where: {
          name: category.name, // 'category.name' é o nome da categoria enviado do frontend
        },
      });

      if (!categoryRecord) {
        throw new Error(`Categoria ${category.name} não encontrada`);
      }

      // Criar a relação entre receita e categoria
      return db.recipeCategory.create({
        data: {
          recipeId: recipe.id,
          categoryId: categoryRecord.id,
        },
      });
    })
  );

  return { recipe, ingredients, categories };
};
