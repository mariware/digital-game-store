"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectGameSet } from "@/store";
import {
  resetGames,
  setGames,
  setLastFetchTime,
} from "@/store/slices/gamesSlice";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { use } from "react";
import GameCard, { SkeletonCard } from "@/components/GameCard";

export default function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = use(params).slug;
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const fetchTime = useAppSelector((state) => state.games.lastFetchTime);
  const genre = useAppSelector((state) =>
    state.games.genres.find((g) => g.slug.toLowerCase() === slug.toLowerCase()),
  );

  const games = useAppSelector(selectGameSet(slug));

  useEffect(() => {
    if (!fetchTime || Date.now() - fetchTime > 3600000) {
      dispatch(resetGames());
    }
    if (!games.length) {
      fetch(`/api/categories?genre=${genre?.id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setGames({ key: slug, games: data }));
          dispatch(setLastFetchTime(Date.now()));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchTime, genre?.id, games.length, slug, pathname, dispatch]);

  return (
    <main
      className="flex flex-col gap-8 font-sans min-h-screen p-8 sm:p-12 md:p-16 lg:p-20 bg-foreground text-background"
      suppressHydrationWarning
    >
      <h1 className="flex justify-center sm:justify-start gap-4 font-special text-4xl text-center sm:text-left w-full">
        <Link href="/categories" className="hidden sm:flex">
          Categories<span className="pl-4">&rsaquo;</span>
        </Link>
        {genre?.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
        ) : games.length ? (
          games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              showAction={game.price !== null}
            />
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>

      <div className="pt-12 lg:pt-16 flex flex-col gap-4 items-center w-full">
        <h3 className="font-special text-2xl text-center">
          Still 404?
          <br className="sm:hidden" /> Let&apos;s find some more.
        </h3>
        <Link href="/categories">
          <Button
            size="lg"
            variant="inverse"
            className="font-special hover:scale-110"
          >
            Back to categories <ArrowRight className="!h-5 !w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
