import { NextRequest, NextResponse } from "next/server";
import type { GameSummary, GamesListResponse } from "@/types/games";
import { enrichGames } from "../enrichGames";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre");
    let games: GameSummary[] = [];

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${genre}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GamesListResponse = await res.json();
    games = data.results;

    return enrichGames(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
