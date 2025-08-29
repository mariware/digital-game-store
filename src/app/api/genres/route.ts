import { NextResponse } from "next/server";
import type { Genre, GenresResponse } from "@/types/games";
// import gamesMock from "@/mock/games.json";

export async function GET() {
  try {
    let genres: Genre[] = [];

    const res = await fetch(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error("RAWG list fetch failed");
    const data: GenresResponse = await res.json();
    genres = data.results;

    return NextResponse.json(genres);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
