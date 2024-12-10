"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";
import {
  CATEGORIES,
  CATEGORIES_LABELS,
  INGREDIENTS,
  INGREDIENTS_LABELS,
} from "../_utils/constants";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const FilterContainer = () => {
  const [ingredientSelected, setIngredientSelected] = useState<string[]>([]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const [moreIngredients, setMoreIngredients] = useState<boolean>(false);

  const handleFilter = ({ type, value }: { type: string; value: string }) => {
    if (type === "ingredient") {
      if (ingredientSelected.includes(value)) {
        setIngredientSelected(
          ingredientSelected.filter((item) => item !== value),
        );
        return;
      }
      setIngredientSelected([...ingredientSelected, value]);
      return;
    }

    if (categorySelected.includes(value)) {
      setCategorySelected(categorySelected.filter((item) => item !== value));
      return;
    }
    setCategorySelected([...categorySelected, value]);
    return;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();

      if (ingredientSelected.length > 0) {
        params.append("ingredients", ingredientSelected.join(","));
      }
      if (categorySelected.length > 0) {
        params.append("categories", categorySelected.join(","));
      }
    }
  }, [ingredientSelected, categorySelected]);

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="white" className="rounded-full" size={"icon"}>
            <FilterIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[34rem] mr-6 mt-2 flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="font-semibold"> Ingredientes </p>
            <div
              className={`flex flex-wrap gap-2 ${moreIngredients ? "" : "h-[7.5rem]"} overflow-hidden`}
            >
              {INGREDIENTS.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => {
                    handleFilter({
                      type: "ingredient",
                      value: ingredient,
                    });
                  }}
                >
                  {ingredientSelected.includes(ingredient) ? (
                    <Badge key={ingredient} className="bg-opacity-5">
                      {INGREDIENTS_LABELS[ingredient]}
                    </Badge>
                  ) : (
                    <Badge key={ingredient} variant={"secondary"}>
                      {INGREDIENTS_LABELS[ingredient]}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              {moreIngredients ? (
                <Button
                  variant={"link"}
                  onClick={() => {
                    setMoreIngredients(false);
                  }}
                >
                  Ocultar
                </Button>
              ) : (
                <Button
                  variant={"link"}
                  onClick={() => {
                    setMoreIngredients(true);
                  }}
                >
                  Ver mais
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="font-semibold"> Categorias </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    handleFilter({
                      type: "category",
                      value: category,
                    });
                  }}
                >
                  {categorySelected.includes(category) ? (
                    <Badge key={category} className="bg-opacity-5">
                      {CATEGORIES_LABELS[category]}
                    </Badge>
                  ) : (
                    <Badge key={category} variant={"secondary"}>
                      {CATEGORIES_LABELS[category]}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterContainer;
