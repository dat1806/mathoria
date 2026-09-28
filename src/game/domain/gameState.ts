import type { LearningState } from "../../learning/domain/mastery";

export type WorldStage =
  | "CAMP"
  | "SETTLEMENT"
  | "VILLAGE"
  | "CASTLE"
  | "KINGDOM";

export interface InventoryState {
  materials: number;
  coins: number;
}

export interface WorldState {
  stage: WorldStage;
  unlockedLocations: string[];
  builtBuildings: string[];
}

export interface AdventureProgressState {
  currentAdventureId: string | null;
  currentNodeId: string | null;
  completedAdventureIds: string[];
}

export interface PlayerState {
  name?: string;
}

export interface GameSettings {
  locale: "vi";
}

export interface GameState {
  version: number;
  player: PlayerState;
  world: WorldState;
  learning: LearningState;
  inventory: InventoryState;
  adventures: AdventureProgressState;
  settings: GameSettings;
}

export const SAVE_VERSION = 1;

export function createInitialGameState(): GameState {
  return {
    version: SAVE_VERSION,
    player: {},
    world: {
      stage: "CAMP",
      unlockedLocations: [],
      builtBuildings: [],
    },
    learning: { masteryByFact: {} },
    inventory: { materials: 0, coins: 0 },
    adventures: {
      currentAdventureId: null,
      currentNodeId: null,
      completedAdventureIds: [],
    },
    settings: { locale: "vi" },
  };
}
