import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GameCard, { SkeletonCard } from "./GameCard";
import { useEffect, useState } from "react";
import { GameWithPrice } from "@/types/games";

interface GameCarouselProps {
  title: string;
  games: GameWithPrice[];
  loading: boolean;
  showAction?: boolean;
}

export default function GameCarousel({
  title,
  games,
  loading,
  showAction,
}: GameCarouselProps) {
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setSlidesToScroll(4);
      else if (window.innerWidth >= 768) setSlidesToScroll(3);
      else if (window.innerWidth >= 640) setSlidesToScroll(2);
      else setSlidesToScroll(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <h2 className="flex font-special text-3xl justify-center sm:justify-start sm:pl-12 w-full pt-12 lg:pt-16">
        {title}
      </h2>
      <Carousel opts={{ loop: true, slidesToScroll }} className="mx-12">
        <CarouselContent>
          {loading || !Array.isArray(games)
            ? Array.from({ length: 4 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <SkeletonCard />
                </CarouselItem>
              ))
            : games.map((game) => (
                <CarouselItem
                  key={game.id}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <GameCard game={game} showAction={showAction} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
