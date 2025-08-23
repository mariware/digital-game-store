import type { GameSummary, GamesListResponse } from "@/types/games";
import gamesMock from "@/mock/games.json";

const useMock = process.env.NODE_ENV === "development";

export async function getGames(): Promise<GameSummary[]> {
  if (useMock) {
    return (gamesMock as GamesListResponse).results;
  }
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&page=1&page_size=20`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();
  return json.results as GameSummary[];
}
