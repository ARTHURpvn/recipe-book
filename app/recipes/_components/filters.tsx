"use client";
import { CATEGORIES_LABELS, INGREDIENTS_LABELS } from "@/app/_utils/constants";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Filters = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const srcFilter = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIngredients(srcFilter.get("ingredients")?.split(",") as string[]);
      setCategories(srcFilter.get("categories")?.split(",") as string[]);
    }
  }, [srcFilter]);

  return (
    <div className="flex gap-2">
      {categories?.map((item) => (
        <Badge key={item} variant={"primary"}>
          {CATEGORIES_LABELS[item]}
        </Badge>
      ))}

      {ingredients?.map((item) => (
        <Badge key={item} variant={"primary"}>
          {INGREDIENTS_LABELS[item]}
        </Badge>
      ))}
    </div>
  );
};

export default Filters;
