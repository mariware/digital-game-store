"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from ".";
import { useEffect } from "react";
import { setInCartGames } from "./slices/gamesSlice";

export const useLoadCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("inCartGames");
    if (stored) {
      dispatch(setInCartGames(JSON.parse(stored)));
    }
  }, [dispatch]);
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
