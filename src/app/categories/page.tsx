"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetGenres,
  setGenres,
  setLastFetchTime,
} from "@/store/slices/gamesSlice";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GenreCard, { SkeletonCard } from "@/components/GenreCard";

export default function Categories() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const fetchTime = useAppSelector((state) => state.games.lastFetchTime);
  const genres = useAppSelector((state) => state.games.genres);

  useEffect(() => {
    if (!fetchTime || Date.now() - fetchTime > 3600000) {
      dispatch(resetGenres());
    }
    if (!genres.length) {
      fetch(`/api/genres`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setGenres(data));
          dispatch(setLastFetchTime(Date.now()));
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchTime, genres.length, pathname, dispatch]);

  return (
    <main className="flex flex-col gap-8 font-sans min-h-screen p-8 sm:p-12 md:p-16 lg:p-20 bg-foreground text-background">
      <h2 className="flex font-special text-4xl justify-center sm:justify-start w-full text-center">
        Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 36 }).map((_, i) => <SkeletonCard key={i} />)
        ) : genres.length ? (
          genres.map((genre) => <GenreCard key={genre.id} genre={genre} />)
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </main>
  );
}
