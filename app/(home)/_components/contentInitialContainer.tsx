"use client";

import { getAllRecipes } from "@/app/_data/readRecipe";
import { CATEGORY_BY_ID, RecipeProps } from "@/app/_utils/constants";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BeefIcon,
  CakeSliceIcon,
  PlayIcon,
  SoupIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ContentInitialContainer = () => {
  const [recipes, setRecipes] = useState<Array<RecipeProps>>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getAllRecipes();
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  return (
    <div className={`relative flex justify-center w-[80%] font-geist-sans`}>
      <Carousel className=" w-full" plugins={[Autoplay({ delay: 5000 })]}>
        <CarouselPrevious />
        <CarouselContent>
          {recipes.map((recipe) => (
            <CarouselItem key={recipe.id}>
              <Card className=" w-full rounded-2xl overflow-hidden">
                <CardContent className="flex p-0">
                  <div className="relative w-1/2 bg-primary drop-shadow-[10px_0_10px_rgba(0,0,0,0.5)]">
                    {/* Criando a Badge */}
                    <div className="absolute top-12 left-12 gap-6">
                      {recipe.categories.map((category) => (
                        <Badge
                          variant="default"
                          key={category.id}
                          className=" bg-primary-foreground text-black gap-4 py-1 px-3 text-sm"
                        >
                          {/* Selecionando Icone de acordo com a categoria */}
                          {category.categoryId == 1 ? (
                            <SoupIcon />
                          ) : category.categoryId == 2 ? (
                            <CakeSliceIcon />
                          ) : (
                            <BeefIcon />
                          )}

                          {CATEGORY_BY_ID[category.categoryId]}
                        </Badge>
                      ))}
                    </div>

                    <header className="space-y-4 mx-12 mt-32">
                      <h1 className="text-5xl text-card font-bold">
                        {recipe.title}
                      </h1>

                      <h2 className="text-accent">{recipe.description}</h2>
                    </header>

                    <section className="absolute bottom-9 right-1/2 translate-x-[50%] flex flex-col items-center justify-center">
                      <div className="space-x-6">
                        <Badge
                          variant="default"
                          className="bg-primary-foreground/30 text-white gap-4 text-base py-2 px-4"
                        >
                          <TimerIcon />
                          <p>{recipe.cookTime + recipe.prepTime} Minutos</p>
                        </Badge>

                        <Badge
                          variant="default"
                          className="bg-primary-foreground/30 text-white gap-4 text-base py-2 px-4"
                        >
                          <TimerIcon />
                          <p>
                            {recipe.servings}{" "}
                            {recipe.servings > 1 ? "Porções" : "Porção"}
                          </p>
                        </Badge>
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-full text-lg mt-10 py-6 px-8 gap-3"
                      >
                        Ver Receita <PlayIcon />
                      </Button>
                    </section>
                  </div>

                  <div className="w-1/2 h-[65vh]">
                    <Image
                      src={recipe.photo}
                      alt="Logo"
                      width={900}
                      height={900}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ContentInitialContainer;
