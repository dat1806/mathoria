import type { GameState } from "../game/domain/gameState";

export interface GameRepository {
  load(): Promise<GameState | null>;
  save(state: GameState): Promise<void>;
  clear(): Promise<void>;
}
