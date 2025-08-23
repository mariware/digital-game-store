"use client";

/* eslint-disable @next/next/no-img-element */

import { getGames } from "@/api/games";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGames } from "@/store/slices/gamesSlice";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export default function Browse() {
  const dispatch = useAppDispatch();
  const games = useAppSelector((s) => s.games.games);

  useEffect(() => {
    (async () => {
      const data = await getGames();
      dispatch(setGames(data));
    })();
  }, [dispatch]);

  console.log(games);

  return (
    <main className="flex flex-col gap-8 font-sans min-h-screen p-20 bg-foreground text-background">
      <div className="relative flex flex-col gap-4">
        <h2 className="font-special text-3xl">Discover</h2>
        <Carousel>
          <CarouselContent>
            {games?.map((game) => (
              <CarouselItem
                key={game.id}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3"
              >
                <Card className="bg-primary text-primary-foreground border-0 rounded-sm py-0 gap-0 overflow-hidden">
                  <CardHeader className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        alt={game.slug}
                        className="object-cover h-full w-full"
                        src={game.background_image}
                      />
                    </AspectRatio>
                  </CardHeader>
                  <CardContent className="flex flex-col pt-4 px-4">
                    <span className="text-2xl font-special line-clamp-2 min-h-16">
                      {game.name}
                    </span>
                  </CardContent>
                  <CardFooter className="text-sm px-4 pb-4 flex justify-between items-center">
                    <span>Price:</span>
                    <Button
                      variant="inverse"
                      className="font-special hover:bg-foreground hover:text-background hover:scale-110"
                    >
                      <Plus /> Add to Cart{" "}
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
