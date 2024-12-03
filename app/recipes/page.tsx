"use client";
import { useEffect, useState } from "react";
import CardRecipe from "../_components/_cardRecipe";
import AddRecipe from "../_components/_form/addRecipe";
import Header from "../_components/header";
import { getAllRecipes } from "../_data/readRecipe";
import { RecipeProps } from "../_utils/constants";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      setRecipes(await getAllRecipes());
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Header />
      <section className=" mx-20 mt-20">
        <AddRecipe />

        <div className="flex justify-center gap-16 flex-wrap">
          {recipes.map((recipe) => (
            <CardRecipe
              name={recipe.title}
              image={recipe.photo}
              totalTime={recipe.cookTime + recipe.prepTime}
              favorite={false}
              key={recipe.id}
              id={recipe.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default RecipesPage;
