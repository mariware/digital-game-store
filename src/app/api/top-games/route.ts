import { NextResponse } from "next/server";
import type { GameSummary, GamesListResponse } from "@/types/games";
import { enrichGames } from "../enrichGames";
// import gamesMock from "@/mock/games.json";

// const useMock = process.env.NODE_ENV === "development";

export async function GET() {
  try {
    let games: GameSummary[] = [];

    // if (useMock) {
    //   games = (gamesMock as GamesListResponse).results;
    // } else {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=40`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GamesListResponse = await res.json();
    games = data.results;
    // }

    return enrichGames(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
