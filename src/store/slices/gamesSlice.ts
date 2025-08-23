import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GameSummary,
  GameDetails,
  ScreenshotsTypes,
  GamesState,
} from "../../types/games";
import { saveToLocalStorage, loadFromLocalStorage } from "@/utils/storage";

const initialState: GamesState = {
  games: [],
  searchedGames: [],
  inCartGames: loadFromLocalStorage<GameSummary[]>("inCartGames", []),
  gameSpecification: undefined,
  gameScreenshots: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<GameSummary[]>) => {
      state.games = action.payload;
    },
    setSearchedGames: (state, action: PayloadAction<GameSummary[]>) => {
      state.searchedGames = action.payload;
    },
    setInCartGames: (state, action: PayloadAction<GameSummary[]>) => {
      state.inCartGames = action.payload;
      saveToLocalStorage("inCartGames", state.inCartGames);
    },
    setGameSpecification: (state, action: PayloadAction<GameDetails>) => {
      state.gameSpecification = action.payload;
    },
    setGameScreenshots: (state, action: PayloadAction<ScreenshotsTypes[]>) => {
      state.gameScreenshots = action.payload;
    },
  },
});

export const {
  setGames,
  setSearchedGames,
  setInCartGames,
  setGameSpecification,
  setGameScreenshots,
} = gamesSlice.actions;

export default gamesSlice.reducer;
