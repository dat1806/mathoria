import { createContext, useContext } from "react";
import { useStore } from "zustand";
import type { BoundGameStore, GameStore } from "./gameStore";

export const GameStoreContext = createContext<BoundGameStore | null>(null);

export function useGameStore<T>(selector: (state: GameStore) => T): T {
  const store = useContext(GameStoreContext);
  if (store === null) throw new Error("GameStoreContext is missing");
  return useStore(store, selector);
}
