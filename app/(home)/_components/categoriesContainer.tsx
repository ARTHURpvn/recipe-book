import { CATEGORIES, CATEGORIES_LABELS } from "@/app/_utils/constants";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryEnum } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";

const CategoriesContainer = () => {
  const handleCategory = (category: CategoryEnum) => {
    redirect(`/recipes?categories=${category}`);
  };

  return (
    <Carousel>
      <CarouselPrevious />
      <CarouselContent className="pl-4 gap-4">
        {CATEGORIES.map((category, index) => (
          <Button
            key={index}
            className="cursor-pointer"
            variant={"ghost"}
            onClick={() => handleCategory(category as CategoryEnum)}
            asChild
          >
            <CarouselItem
              key={index}
              className="basis-1/5 h-80 rounded-xl flex flex-col items-center pb-4 justify-between bg-gradient-to-t
        from-accent/90 to-background"
            >
              <Image
                src={`/categories/${CATEGORIES_LABELS[category]}.png`}
                alt="Logo"
                width={250}
                height={250}
              />
              <p className="text-2xl font-bold">
                {CATEGORIES_LABELS[category]}
              </p>
            </CarouselItem>
          </Button>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default CategoriesContainer;
