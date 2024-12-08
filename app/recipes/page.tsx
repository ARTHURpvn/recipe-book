"use client";
import { useEffect, useState } from "react";
import CardRecipe from "../_components/_cardRecipe";
import AddRecipe from "../_components/_form/addRecipe";
import Header from "../_components/header";
import { getAllRecipes } from "../_data/readRecipe";
import { RecipeProps } from "../_utils/constants";
import Search from "../_components/search";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>(
    JSON.parse(localStorage.getItem("recipes") as string),
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setRecipes(await getAllRecipes());
      localStorage.setItem("recipes", JSON.stringify(recipes));
    };
    fetchRecipes();
  }, [recipes]);

  const filteredRecipes = recipes.filter((recipe) => {
    if (search === "") return true;
    return recipe.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Header />
      <section className="mx-20 mt-6">
        <div className="flex justify-between">
          <AddRecipe />
          <Search setSearch={setSearch} />
        </div>

        <div className="flex justify-center gap-16 flex-wrap">
          {filteredRecipes.map((recipe) => (
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
