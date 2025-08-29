"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLastFetchTime,
  setSearchedGames,
} from "@/store/slices/gamesSlice";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import GameCard, { SkeletonCard } from "@/components/GameCard";

export default function Latest() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const games = useAppSelector((state) => state.games.searchedGames);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/all-games?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setSearchedGames(data));
        dispatch(setLastFetchTime(Date.now()));
      })
      .finally(() => setLoading(false));
  }, [pathname, page, dispatch]);

  console.log(games);

  return (
    <main className="flex flex-col gap-8 font-sans min-h-screen p-20 bg-foreground text-background">
      <h1 className="flex font-special text-4xl justify-center sm:justify-start w-full">
        All Games
      </h1>
      <p className="flex justify-center sm:justify-start w-full">
        Showing {(page - 1) * 36 + 1} to {page * 36} out of 180 results
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 36 }).map((_, i) => <SkeletonCard key={i} />)
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((page) => (page - 1 > 0 ? page - 1 : 1))}
            />
          </PaginationItem>
          {Array.from({ length: 5 }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                isActive={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage((page) => (page + 1 < 6 ? page + 1 : 5))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
