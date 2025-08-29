import { configureStore } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import gamesReducer from "./slices/gamesSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export const selectGameSet = (key: string) =>
  createSelector(
    (state: RootState) => state.games.gameSets,
    (sets) => sets[key] ?? [],
  );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
