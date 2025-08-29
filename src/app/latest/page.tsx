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
import GameCarousel from "@/components/GameCarousel";

const sections = [
  { key: "latest", title: "Just Released", url: "/api/latest-games" },
  { key: "top", title: "Most Played Right Now", url: "/api/top-games" },
  { key: "upcoming", title: "Upcoming Titles", url: "/api/upcoming-games" },
] as const;

export default function Latest() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const fetchTime = useAppSelector((state) => state.games.lastFetchTime);

  const games = {
    latest: useAppSelector(selectGameSet("latest")),
    top: useAppSelector(selectGameSet("top")),
    upcoming: useAppSelector(selectGameSet("upcoming")),
  };

  useEffect(() => {
    if (!fetchTime || Date.now() - fetchTime > 3600000) {
      dispatch(resetGames());
    }
    if (!games.latest.length || !games.top.length || !games.upcoming.length) {
      Promise.all(
        sections.map(({ key, url }) =>
          fetch(url)
            .then((res) => res.json())
            .then((data) => ({ key, data })),
        ),
      )
        .then((results) => {
          results.forEach(({ key, data }) =>
            dispatch(setGames({ key, games: data })),
          );
          dispatch(setLastFetchTime(Date.now()));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [
    fetchTime,
    games.latest.length,
    games.top.length,
    games.upcoming.length,
    pathname,
    dispatch,
  ]);

  return (
    <main className="flex flex-col gap-8 font-sans min-h-screen pt-4 p-12 lg:p-20 lg:pt-4 bg-foreground text-background">
      <div className="relative flex flex-col gap-4">
        {sections.map(({ key, title }) => (
          <GameCarousel
            key={key}
            title={title}
            games={games[key as keyof typeof games]}
            loading={loading}
            showAction={key !== "upcoming"}
          />
        ))}
      </div>

      <div className="pt-12 lg:pt-16 flex flex-col gap-4 items-center w-full">
        <h3 className="font-special text-2xl">
          Still 404? Let&apos;s find some more.
        </h3>
        <Link href="/browse">
          <Button
            size="lg"
            variant="inverse"
            className="font-special hover:scale-110"
          >
            Access all titles <ArrowRight className="!h-5 !w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
