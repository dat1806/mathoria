import type { GameState } from "../game/domain/gameState";
import type { GameRepository } from "./GameRepository";
import { migrateSave } from "./migrateSave";
import type { StorageLike } from "./storage";

export const GAME_SAVE_KEY = "mathoria:save";

export class LocalStorageGameRepository implements GameRepository {
  constructor(private readonly storage: StorageLike) {}

  async load(): Promise<GameState | null> {
    const serialized = this.storage.getItem(GAME_SAVE_KEY);
    if (serialized === null) return null;

    try {
      const state = migrateSave(JSON.parse(serialized) as unknown);
      if (state === null) this.storage.removeItem(GAME_SAVE_KEY);
      return state;
    } catch {
      this.storage.removeItem(GAME_SAVE_KEY);
      return null;
    }
  }

  async save(state: GameState): Promise<void> {
    this.storage.setItem(GAME_SAVE_KEY, JSON.stringify(state));
  }

  async clear(): Promise<void> {
    this.storage.removeItem(GAME_SAVE_KEY);
  }
}
