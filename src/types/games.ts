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

// RAWG API responses
export type GamesListResponse = PaginatedList<GameSummary>;
export type GameDetailResponse = GameDetails;
export type ScreenshotsResponse = PaginatedList<ScreenshotsTypes>;

// Redux state shape for games slice
export type GamesState = {
  games: GameSummary[]; // from /games list
  searchedGames: GameSummary[]; // filtered list
  inCartGames: GameSummary[]; // cart items
  gameSpecification?: GameDetails; // single game detail
  gameScreenshots: ScreenshotsTypes[]; // screenshots for a game
};
