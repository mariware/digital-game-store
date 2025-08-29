import { NextResponse } from "next/server";
import type { GameSummary, GamesListResponse } from "@/types/games";
// import gamesMock from "@/mock/games.json";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function GET() {
  try {
    let games: GameSummary[] = [];
    const nextYear = new Date();
    nextYear.setMonth(nextYear.getFullYear() + 1);

    const dateNow = formatDate(new Date());
    const dateNextYear = formatDate(nextYear);

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&dates=${dateNow},${dateNextYear}&page_size=40&ordering=-added`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GamesListResponse = await res.json();
    games = data.results;

    const results = games.map((game) => {
      return {
        ...game,
        price: null,
        currency: null,
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
