"use client";
import { useEffect, useState } from "react";
import CardRecipe from "../_components/_cardRecipe";
import AddRecipe from "../_components/_form/addRecipe";
import Header from "../_components/header";
import { getAllRecipes } from "../_data/readRecipe";
import {
  CATEGORIES_LABELS,
  CATEGORY_BY_ID,
  INGREDIENTS_BY_ID,
  INGREDIENTS_LABELS,
  RecipeProps,
} from "../_utils/constants";
import Search from "../_components/search";
import Filters from "./_components/filters";
import { useSearchParams } from "next/navigation";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>(
    JSON.parse(localStorage.getItem("recipes") as string),
  );
  const [filteredRecipes, setFilteredRecipes] =
    useState<Array<RecipeProps>>(recipes);
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const srcFilter = useSearchParams();

  // Atualizando a lista de receitas
  useEffect(() => {
    const fetchRecipes = async () => {
      setRecipes(await getAllRecipes());
      localStorage.setItem("recipes", JSON.stringify(recipes));
    };
    fetchRecipes();
  }, [recipes]);

  // Atualizando os filtros
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (srcFilter.get("ingredients")) {
        const ingredient: string = srcFilter.get("ingredients") as string;
        if (!ingredient) return;
        setIngredients(
          INGREDIENTS_LABELS[ingredient]
            ? [INGREDIENTS_LABELS[ingredient]]
            : [],
        );
      }

      setCategories(srcFilter.get("categories")?.split(",") as string[]);
    }
  }, [srcFilter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (srcFilter.get("ingredients")) {
        const ingredient = srcFilter.get("ingredients");
        if (!ingredient) return;
        setIngredients(
          Array.isArray(INGREDIENTS_LABELS[ingredient])
            ? INGREDIENTS_LABELS[ingredient]
            : [INGREDIENTS_LABELS[ingredient]],
        );
      }

      setCategories(srcFilter.get("categories")?.split(",") || []);
    }
  }, [srcFilter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedIngredients =
        srcFilter.get("ingredients")?.split(",") || [];
      setIngredients(
        selectedIngredients.map(
          (ingredient) => INGREDIENTS_LABELS[ingredient] || ingredient,
        ),
      );

      setCategories(srcFilter.get("categories")?.split(",") || []);
    }
  }, [srcFilter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedIngredients =
        srcFilter.get("ingredients")?.split(",") || [];
      setIngredients(
        selectedIngredients.map(
          (ingredient) => INGREDIENTS_LABELS[ingredient] || ingredient,
        ),
      );

      setCategories(srcFilter.get("categories")?.split(",") || []);
    }
  }, [srcFilter]);

  // Seleciona receita com base nos filtros
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
      // Filtro de busca
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // Filtro de ingredientes: verificar se a receita contém todos os ingredientes selecionados
      const matchesIngredients =
        ingredients.length === 0 ||
        ingredients.every((ingredient) =>
          recipe.ingredients.some(
            (item) => INGREDIENTS_BY_ID[item.ingredientId] === ingredient,
          ),
        );

      // Filtro de categorias (caso seja necessário)
      const matchesCategories =
        categories.length === 0 ||
        categories.every((category) =>
          recipe.categories.some(
            (item) =>
              CATEGORY_BY_ID[item.categoryId] === CATEGORIES_LABELS[category],
          ),
        );

      return matchesSearch && matchesIngredients && matchesCategories;
    });

    setFilteredRecipes(filteredRecipes);
  }, [search, ingredients, categories, recipes]);

  return (
    <>
      <Header />
      <section className="mx-20 mt-6">
        <div className="flex justify-between">
          <AddRecipe />
          <Search setSearch={setSearch} />
        </div>

        <div className="flex flex-wrap items-center mt-4 h-12">
          <Filters />
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
