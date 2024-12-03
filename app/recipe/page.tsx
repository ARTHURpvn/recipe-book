"use client";
import Image from "next/image";
import Header from "../_components/header";
import { Button } from "@/components/ui/button";
import { HeartIcon, Share2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Title from "./_component";
import Footer from "../_components/footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRecipeById } from "../_data/readRecipe";
import {
  INGREDIENTS_BY_ID,
  QUANTITY_TYPE_LABELS,
  RecipeProps,
} from "../_utils/constants";
import { getUserNameById } from "../_utils/getuserId";

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeProps>();
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const recipeId = useSearchParams();


  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipeById(Number(recipeId?.get("id")));
      setRecipe(recipe as RecipeProps);
    };
    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const fetchUserName = async () => {
      const userName = await getUserNameById({
        userId: recipe?.authorId as string,
      });
      setUserName(userName[0]);
      setUserImage(userName[1]);
    };
    fetchUserName();
  }, [recipe?.authorId]);

  const date = recipe?.createdAt?.toLocaleDateString("pt-BR");

  return (
    <>
      <Header />
      <div className="relative flex items-center flex-col mt-6">
        <Button variant={"ghost"} asChild>
          <Link
            href="/recipes"
            className="absolute top-0 left-12 text-primary cursor-pointer font-semibold"
          >
            Voltar
          </Link>
        </Button>

        <main className="flex flex-col justify-center h-fit items-center mt-12">
          <h1 className="text-3xl font-bold">{recipe?.title}</h1>

          <div className="grid grid-cols-2 w-[65%] mt-6 gap-12">
            <Image
              src={recipe?.photo || "/leclerc.jpg"}
              alt="Logo"
              width={640}
              height={640}
              className="object-cover h-full aspect-square rounded-xl"
            />
            <div className="flex flex-col items-center justify-between">
              <p className="text-xl">{recipe?.description}</p>

              <div className="flex flex-col items-center w-full gap-6">
                <div className="flex gap-4">
                  <Button className="rounded-full bg-transparent border-2 gap-4 border-red-600 hover:bg-red-600">
                    <HeartIcon fill="white" />
                    <p className="text-lg font-semibold"> Favoritar </p>
                  </Button>

                  <Button className="rounded-full gap-4" variant={"white"}>
                    <Share2Icon fill="white" />
                    <p className="text-lg font-semibold"> Compartilhar </p>
                  </Button>
                </div>
                <Separator />
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userImage || "/leclerc.jpg"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm"> Por {userName} </p>
                  <p className="text-sm"> | </p>
                  <p className="text-sm">Criado em {date}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="flex flex-col items-center justify-between mt-12 w-[65%]">
          <Title left="Ingredientes" right="8 porções" />

          <ul className="flex flex-col self-start mt-6 w-full gap-2">
            {recipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="flex gap-2 text-lg">
                <p>{ingredient.quantity}</p>
                <p>{QUANTITY_TYPE_LABELS[ingredient.quantity_type]}</p>
                <p>de</p>
                <p>{INGREDIENTS_BY_ID[ingredient.ingredientId]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-center justify-between mt-12 w-[65%]">
          <Title left="Modo de Preparo" right="30 minutos" />

          <p className="w-[80%] mt-6">
            Misture todos os ingredientes, amasse bem e forme bolinhas, depois
            achate para ter a forma de hambúrguer. Frite numa frigideira
            antiaderente, coloque uma colher de óleo pois a carne não tem
            gordura.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Recipe;
