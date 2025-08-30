import { NextRequest, NextResponse } from "next/server";
import type { GameDetails } from "@/types/games";

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "USD";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "1", 10);

    const res = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GameDetails = await res.json();
    const game = data;

    const searchUrl = `https://www.nexarda.com/api/v3/search?type=games&q=${encodeURIComponent(game.name)}&currency=${encodeURIComponent(DEFAULT_CURRENCY)}`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) throw new Error("NEXARDA search failed");
    const searchJson = await searchRes.json();

    const firstItem = searchJson?.results?.items?.[0];
    const nexardaId = firstItem?.game_info?.id;

    if (!nexardaId) {
      return NextResponse.json({ ...game, price: null, currency: null });
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
      return NextResponse.json({ ...game, price: null, currency: null });
    }

    return NextResponse.json({ ...game, price: lowest, currency });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
