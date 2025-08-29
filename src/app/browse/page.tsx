"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetGames, setGames } from "@/store/slices/gamesSlice";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { selectGameSet } from "@/store";

export default function Latest() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const topGames = useAppSelector(selectGameSet("top"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(resetGames());
  }, [pathname, dispatch]);

  useEffect(() => {
    fetch("/api/top-games")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setGames({ key: "top", games: data }));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  console.log(topGames);

  const [slidesToScroll, setSlidesToScroll] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024)
        setSlidesToScroll(4); // lg
      else if (window.innerWidth >= 768)
        setSlidesToScroll(3); // md
      else if (window.innerWidth >= 640)
        setSlidesToScroll(2); // sm
      else setSlidesToScroll(1); // base
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main className="flex flex-col gap-8 font-sans min-h-screen p-20 bg-foreground text-background">
      <div className="relative flex flex-col gap-4">
        <h2 className="font-special text-3xl">Discover</h2>
        <Carousel opts={{ loop: true, slidesToScroll }}>
          {loading || !Array.isArray(topGames) ? (
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="bg-primary text-primary-foreground border-0 rounded-sm py-0 gap-0 overflow-hidden">
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 9}>
                        <Skeleton className="w-full h-full bg-foreground rounded-none" />
                      </AspectRatio>
                    </CardHeader>
                    <CardContent className="flex flex-col pt-4 pb-1 px-4 items-start">
                      <Skeleton className="h-8 w-3/4 bg-foreground" />
                    </CardContent>
                    <CardFooter className="text-sm px-4 pb-4 flex justify-between items-center">
                      <Skeleton className="h-5 w-1/4 rounded-sm bg-foreground" />
                      <Skeleton className="h-9 w-27.5 rounded-sm bg-foreground" />
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <CarouselContent>
              {topGames?.map((game) => (
                <CarouselItem
                  key={game.id}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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
                    <CardContent className="flex flex-col pt-4 pb-1 px-4 items-start">
                      <span className="text-2xl font-special line-clamp-1">
                        {game.name}
                      </span>
                    </CardContent>
                    <CardFooter className="text-sm px-4 pb-4 flex justify-between items-center">
                      <span>
                        {game.price ? (
                          <span>
                            {game.currency} {game.price}
                          </span>
                        ) : (
                          "Free to Play"
                        )}{" "}
                      </span>
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
          )}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
