"use client";
import { useEffect, useState } from "react";
import { createRecipe } from "./_data/createRecipe";
import { getAllRecipes } from "./_data/readRecipe";
import { INGREDIENTS_BY_ID, CATEGORY_BY_ID, QUANTITY_TYPE_LABEL } from "./_utils/constants";

type RecipeProps = {
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

const Home = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>([]);
  const handleAddRecipe = async () => {
    await createRecipe({
      title: "Bolo de Leitinho",
      description: "Um delicioso leitinho.",
      servings: 1,
      prepTime: 20,
      cookTime: 40,
      instructions: "Misture os ingredientes e leve ao forno por 40 minutos.",
      photo: "https://example.com/bolo.jpg",
      authorId: "user-123",
      ingredients: [
        { ingredient: "FLUOR", quantity: "100", quantity_type: "CUP" },
        { ingredient: "MILK", quantity: "1", quantity_type: "LITRE" },
      ],
      categories: [{ name: "LUNCH" }],
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  console.log(recipes);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleAddRecipe}> Adicionar </button>
      <div className="flex gap-12">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.cookTime}min. | Tempo de cozimento</p>
            <p>{recipe.prepTime}min. | Tempo de preparação</p>
            <p>serve {recipe.servings} pessoa</p>
            <p>{recipe.instructions}</p>
            <p>{recipe.photo}</p>
            <p>Feito por: {recipe.authorId}</p>
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.ingredientId} className="flex gap-2">
                <p>{ingredient.quantity}</p>
                <p>{QUANTITY_TYPE_LABEL[ingredient.quantity_type]}</p>
                <p> de </p>
                <p>{INGREDIENTS_BY_ID[ingredient.ingredientId]}</p>
              </div>
            ))}

            {recipe.categories.map((category) => (
              <div key={category.id} className="flex gap-2">
                <p>{CATEGORY_BY_ID[category.categoryId]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
