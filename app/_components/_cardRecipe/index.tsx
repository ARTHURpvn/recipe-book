"use client";
import { Clock2Icon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CardRecipeProps = {
  favorite: boolean;
  name: string;
  image: string;
  totalTime: number;
  id: number;
};

const CardRecipe = ({
  favorite,
  name,
  image,
  totalTime,
  id,
}: CardRecipeProps) => {
  return (
    <Link href={`/recipe/?id=${id}`}>
      <div
        className="flex flex-col relative items-center bg-gradient-to-t
        from-accent/80 to-background w-60 h-72 overflow-hidden mt-20 rounded-xl"
      >
        <div className="flex w-[90%] h-[60%] overflow-hidden rounded-xl">
          <Image
            src={image}
            alt="Logo"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full px-4">
          <h1 className=" text-xl font-bold mt-2 h-[20%]">{name}</h1>
        </div>

        <div className="self-start ml-4 mt-4 flex items-center gap-2 text-sm">
          <Clock2Icon size={16} />
          <span className="font-semibold">{totalTime} Minutos</span>
        </div>

        <div className="flex justify-center items-center absolute top-1 right-4 w-9 h-9 rounded-full bg-white">
          <HeartIcon
            className={`${favorite ? "fill-red-400" : "fill-gray-400"}`}
          />
        </div>
      </div>
    </Link>
  );
};

export default CardRecipe;
