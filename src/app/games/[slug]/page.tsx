"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setGameSpecification,
  setLastFetchTime,
} from "@/store/slices/gamesSlice";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Plus, StarHalfIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Game({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const slug = use(params).slug;
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const route = useRouter();

  const [loading, setLoading] = useState(true);
  const gameSummary = useAppSelector((state) =>
    Object.values(state.games.gameSets)
      .flat()
      .find((g) => g.id == slug),
  );
  const gameDetails = useAppSelector((state) => state.games.gameSpecification);

  useEffect(() => {
    fetch(`/api/games?id=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setGameSpecification(data));
        dispatch(setLastFetchTime(Date.now()));
      })
      .finally(() => setLoading(false));
  }, [slug, pathname, dispatch]);

  return (
    <main className="relative flex flex-col lg:grid lg:grid-cols-3 lg:h-[calc(100dvh-62px)] overflow-clip bg-foreground text-background">
      <Button
        onClick={() => route.back()}
        variant="inverse"
        className="absolute hidden sm:block sm:top-12 md:top-16 lg:top-20 left-8 border-none"
      >
        <ChevronLeft />
      </Button>
      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-full lg:col-span-1">
        <img
          alt={gameSummary?.slug}
          className="object-cover h-full w-full"
          src={gameSummary?.background_image}
        />
      </div>
      <div className="p-8 sm:p-12 md:p-16 lg:p-20 lg:col-span-2 w-full h-full flex flex-col gap-4 font-sans lg:overflow-y-scroll no-scrollbar">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
          <h1 className="flex flex-col gap-4 font-special text-4xl text-center sm:text-left w-full">
            {gameSummary?.name}
          </h1>
          {gameSummary?.price !== null && (
            <div className="flex justify-between items-center gap-4 border-2 rounded-lg border-background">
              <span className="text-sm md:text-base lg:text-lg font-bold text-nowrap pl-4">
                {gameSummary?.price == 0 ? (
                  "Free"
                ) : (
                  <span>
                    {gameSummary?.currency} {gameSummary?.price}
                  </span>
                )}
              </span>
              <Button className="font-special rounded-l-none group">
                <Plus className="group-hover:scale-130 transition-transform" />
              </Button>
            </div>
          )}
        </div>
        {loading ? (
          <p> Loading game details... </p>
        ) : (
          <>
            <div className="w-full flex flex-wrap gap-2 justify-center sm:justify-start">
              {gameDetails?.genres.map((dev, index) => (
                <Badge key={index} className="text-sm font-special">
                  {dev.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <span className="font-bold">{gameDetails?.rating}</span>
              {Array.from({ length: Math.floor(gameDetails?.rating || 0) }).map(
                (_, i) => (
                  <StarIcon
                    key={i}
                    className="h-4 w-4 text-background fill-background"
                  />
                ),
              )}
              {gameDetails?.rating !== undefined &&
                gameDetails.rating % 1 >= 0.5 && (
                  <StarHalfIcon className="h-4 w-4 text-background fill-background" />
                )}
              {gameDetails?.ratings_count !== undefined && (
                <span className="text-sm">
                  {gameDetails?.ratings_count.toLocaleString()} ratings
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-justify">
                {gameDetails?.description_raw}
              </p>
            </div>
            <div>
              <span className="font-bold">Developers: </span>
              {gameDetails?.developers.map((dev, index) => (
                <span key={index} className="text-sm">
                  {dev.name}
                  {index != gameDetails?.developers.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div>
              <span className="font-bold">Publishers: </span>
              {gameDetails?.publishers.map((pub, index) => (
                <span key={index} className="text-sm">
                  {pub.name}
                  {index != gameDetails?.publishers.length - 1 && ", "}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
