// generic pagination wrapper for list endpoints
export type PaginatedList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// shared simple types
export type NameTypes = {
  name: string;
};
export type ScreenshotsTypes = {
  id: number;
  image: string;
};
export type PlatformInfo = {
  id: number;
  slug: string;
  name: string;
};

// game summary
export type GameSummary = {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  parent_platforms: { platform: PlatformInfo }[];
};

// detailed game info
export type GameDetails = GameSummary & {
  description_raw: string;
  rating?: number;
  ratings_count?: number;
  website?: string;
  developers: NameTypes[];
  publishers: NameTypes[];
  genres: NameTypes[];
  short_screenshots: ScreenshotsTypes[];
};
export type GameWithPrice = GameSummary & {
  price: number | null;
  currency: string | null;
};
export type GameDetailsWithPrice = GameSummary & {
  price: number | null;
  currency: string | null;
};

// RAWG API responses
export type GamesListResponse = PaginatedList<GameSummary>;
export type GameDetailResponse = GameDetails;
export type ScreenshotsResponse = PaginatedList<ScreenshotsTypes>;

// Redux state shape for games slice
export type GamesState = {
  gameSets: Record<string, GameWithPrice[]>; // from /games list
  searchedGames: GameWithPrice[]; // filtered list
  inCartGames: GameWithPrice[]; // cart items
  gameSpecification?: GameDetailsWithPrice; // single game detail
  gameScreenshots: ScreenshotsTypes[]; // screenshots for a game
  lastFetchTime?: number; // timestamp of last fetch
};

// Modified response type
export type GamesWithPriceList = PaginatedList<GameWithPrice>;
