import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GamesState,
  GameWithPrice,
  GameDetailsWithPrice,
  Genre,
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
  lastFetchTime: loadFromLocalStorage<number | undefined>(
    "lastFetchTime",
    undefined,
  ),
  genres: loadFromLocalStorage<Genre[]>("genres", []),
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
    setInCartGames: (state, action: PayloadAction<GameWithPrice>) => {
      if (!state.inCartGames.some((game) => game.id === action.payload.id)) {
        state.inCartGames.push(action.payload);
      }
      saveToLocalStorage("inCartGames", state.inCartGames);
    },
    removeInCartGame: (state, action: PayloadAction<number>) => {
      state.inCartGames = state.inCartGames.filter(
        (game) => game.id !== action.payload,
      );
      saveToLocalStorage("inCartGames", state.inCartGames);
    },
    resetInCartGames: (state) => {
      state.inCartGames = [];
      saveToLocalStorage("inCartGames", state.inCartGames);
    },
    setGameSpecification: (
      state,
      action: PayloadAction<GameDetailsWithPrice>,
    ) => {
      state.gameSpecification = action.payload;
    },
    setLastFetchTime: (state, action: PayloadAction<number>) => {
      state.lastFetchTime = action.payload;
      saveToLocalStorage("lastFetchTime", state.gameSets);
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      saveToLocalStorage("genres", state.genres);
    },
    resetGenres: (state) => {
      state.genres = [];
    },
  },
});

export const {
  setGames,
  resetGames,
  setSearchedGames,
  setInCartGames,
  removeInCartGame,
  resetInCartGames,
  setGameSpecification,
  setLastFetchTime,
  setGenres,
  resetGenres,
} = gamesSlice.actions;

export default gamesSlice.reducer;
