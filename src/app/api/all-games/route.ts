import { NextRequest, NextResponse } from "next/server";
import type {
  GameSummary,
  GameWithPrice,
  GamesListResponse,
} from "@/types/games";

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "USD";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    let games: GameSummary[] = [];

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=36&page=${page}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GamesListResponse = await res.json();
    games = data.results;

    const results = await Promise.allSettled(
      games.map(async (game) => {
        try {
          const searchUrl = `https://www.nexarda.com/api/v3/search?type=games&q=${encodeURIComponent(
            game.name,
          )}&currency=${encodeURIComponent(DEFAULT_CURRENCY)}`;

          const searchRes = await fetch(searchUrl);
          if (!searchRes.ok) throw new Error("NEXARDA search failed");
          const searchJson = await searchRes.json();

          const firstItem = searchJson?.results?.items?.[0];
          const nexardaId = firstItem?.game_info?.id;

          if (!nexardaId) {
            return { ...game, price: null, currency: null };
          }

          const pricesUrl = `https://www.nexarda.com/api/v3/prices?type=game&id=${encodeURIComponent(
            nexardaId,
          )}&currency=${encodeURIComponent(DEFAULT_CURRENCY)}`;

          const pricesRes = await fetch(pricesUrl);
          if (!pricesRes.ok) throw new Error("NEXARDA prices fetch failed");
          const pricesJson = await pricesRes.json();

          const lowest = pricesJson?.prices?.lowest;
          const currency = pricesJson?.prices?.currency || DEFAULT_CURRENCY;

          if (lowest === undefined || lowest < 0) {
            return { ...game, price: null, currency: null };
          }

          return { ...game, price: lowest, currency };
        } catch {
          return { ...game, price: null, currency: null };
        }
      }),
    );

    const gamesWithPrices = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<GameWithPrice>).value);

    return NextResponse.json(gamesWithPrices);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
