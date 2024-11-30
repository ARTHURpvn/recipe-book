"use client";
import { useEffect, useState } from "react";
import { createRecipe } from "../_data/createRecipe";
import { getAllRecipes } from "../_data/readRecipe";
import { RecipeProps } from "../_utils/constants";
import Header from "../_components/header";
import { getUserId } from "../_utils/getUserId";
import InitialContainer from "./_components/initialContainer";

const Home = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>([]);
  const [userId, setUserId] = useState<string>("");
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
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUserId(userId as string);
    };

    fetchUserId();
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="">
      <Header />
      <InitialContainer />
      <div className="flex gap-12"></div>
    </div>
  );
};

export default Home;
