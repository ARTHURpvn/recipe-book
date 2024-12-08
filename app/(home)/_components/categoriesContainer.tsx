import { CATEGORIES, CATEGORIES_LABELS } from "@/app/_utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const CategoriesContainer = () => {
  return (
    <Carousel>
      <CarouselContent className="pl-4 gap-4">
        {CATEGORIES.map((category, index) => (
          <CarouselItem
            key={index}
            className="gap-2 basis-1/5 h-72 rounded-xl  bg-gradient-to-t
        from-accent/90 to-background overflow-hidden"
          >
            <Image src="/leclerc.jpg" alt="Logo" width={30} height={30} />
            <p>{CATEGORIES_LABELS[category]}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoriesContainer;
