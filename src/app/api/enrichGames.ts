import { GameSummary, GameWithPrice } from "@/types/games";
import { NextResponse } from "next/server";

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "USD";

export async function enrichGames(games: GameSummary[]) {
  try {
    const searchResults = await Promise.allSettled(
      games.map(async (game) => {
        const searchUrl = `https://www.nexarda.com/api/v3/search?type=games&q=${encodeURIComponent(
          game.name,
        )}&currency=${encodeURIComponent(DEFAULT_CURRENCY)}`;

        const searchRes = await fetch(searchUrl);
        if (!searchRes.ok) throw new Error("NEXARDA search failed");
        const searchJson = await searchRes.json();

        const firstItem = searchJson?.results?.items?.[0];
        const nexardaId = firstItem?.game_info?.id;
        if (!nexardaId) return null;

        return { game, nexardaId };
      }),
    );

    const validSearches = searchResults
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map(
        (r) =>
          (
            r as PromiseFulfilledResult<{
              game: GameSummary;
              nexardaId: string;
            }>
          ).value,
      )
      .slice(0, 30);

    const priceResults = await Promise.allSettled(
      validSearches.map(async ({ game, nexardaId }) => {
        const pricesUrl = `https://www.nexarda.com/api/v3/prices?type=game&id=${encodeURIComponent(
          nexardaId,
        )}&currency=${encodeURIComponent(DEFAULT_CURRENCY)}`;

        const pricesRes = await fetch(pricesUrl);
        if (!pricesRes.ok) throw new Error("NEXARDA prices fetch failed");
        const pricesJson = await pricesRes.json();

        if (
          pricesJson?.prices?.lowest === undefined ||
          pricesJson?.prices?.lowest < 0
        ) {
          return null;
        }

        return {
          ...game,
          price: pricesJson.prices.lowest,
          currency: pricesJson.prices.currency || DEFAULT_CURRENCY,
        };
      }),
    );

    const enrichedGames = priceResults
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => (r as PromiseFulfilledResult<GameWithPrice>).value)
      .slice(0, 20);

    return NextResponse.json(enrichedGames);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
