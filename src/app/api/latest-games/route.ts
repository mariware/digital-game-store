import { NextResponse } from "next/server";
import type { GameSummary, GamesListResponse } from "@/types/games";
import { enrichGames } from "../enrichGames";
// import gamesMock from "@/mock/games.json";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function GET() {
  try {
    let games: GameSummary[] = [];
    const lastQuarter = new Date();
    lastQuarter.setMonth(lastQuarter.getMonth() - 3);

    const dateNow = formatDate(new Date());
    const dateLastQuarter = formatDate(lastQuarter);

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${dateLastQuarter},${dateNow}&page_size=40`,
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
