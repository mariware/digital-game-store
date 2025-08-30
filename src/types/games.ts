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

// game genre
export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
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
};
export type GameWithPrice = GameSummary & {
  price: number | null;
  currency: string | null;
};
export type GameDetailsWithPrice = GameDetails & {
  price: number | null;
  currency: string | null;
};

// RAWG API responses
export type GamesListResponse = PaginatedList<GameSummary>;
export type GameDetailResponse = GameDetails;
export type GenresResponse = PaginatedList<Genre>;
export type ScreenshotsResponse = PaginatedList<ScreenshotsTypes>;

// Redux state shape for games slice
export type GamesState = {
  gameSets: Record<string, GameWithPrice[]>; // from /games list
  searchedGames: GameWithPrice[]; // filtered list
  inCartGames: GameWithPrice[]; // cart items
  gameSpecification?: GameDetailsWithPrice; // single game detail
  lastFetchTime?: number; // timestamp of last fetch
  genres: Genre[]; // available genres
};

// Modified response type
export type GamesWithPriceList = PaginatedList<GameWithPrice>;
