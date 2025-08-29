import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ScreenshotsTypes,
  GamesState,
  GameWithPrice,
  GameDetailsWithPrice,
} from "../../types/games";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/storage";

const initialState: GamesState = {
  gameSets: loadFromLocalStorage<Record<string, GameWithPrice[]>>(
    "gameSets",
    {},
  ),
  searchedGames: [],
  inCartGames: loadFromLocalStorage<GameWithPrice[]>("inCartGames", []),
  gameSpecification: undefined,
  gameScreenshots: [],
  lastFetchTime: loadFromLocalStorage<number | undefined>(
    "lastFetchTime",
    undefined,
  ),
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (
      state,
      action: PayloadAction<{ key: string; games: GameWithPrice[] }>,
    ) => {
      state.gameSets[action.payload.key] = action.payload.games;
      saveToLocalStorage("gameSets", state.gameSets);
    },
    resetGames: (state) => {
      state.gameSets = {};
    },
    setSearchedGames: (state, action: PayloadAction<GameWithPrice[]>) => {
      state.searchedGames = action.payload;
    },
    setInCartGames: (state, action: PayloadAction<GameWithPrice[]>) => {
      state.inCartGames = action.payload;
      saveToLocalStorage("inCartGames", state.inCartGames);
    },
    setGameSpecification: (
      state,
      action: PayloadAction<GameDetailsWithPrice>,
    ) => {
      state.gameSpecification = action.payload;
    },
    setGameScreenshots: (state, action: PayloadAction<ScreenshotsTypes[]>) => {
      state.gameScreenshots = action.payload;
    },
    setLastFetchTime: (state, action: PayloadAction<number>) => {
      state.lastFetchTime = action.payload;
      saveToLocalStorage("lastFetchTime", state.gameSets);
    },
  },
});

export const {
  setGames,
  resetGames,
  setSearchedGames,
  setInCartGames,
  setGameSpecification,
  setGameScreenshots,
  setLastFetchTime,
} = gamesSlice.actions;

export default gamesSlice.reducer;
