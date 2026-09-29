import type { LearningState } from "../../learning/domain/mastery";
import {
  createInitialAdventureProgress,
  type AdventureProgressState,
} from "../adventure/adventureProgress";
import {
  createInitialTutorialProgress,
  type TutorialProgressState,
} from "../../tutorial/domain/tutorialProgress";

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
  tutorial: TutorialProgressState;
}

export const SAVE_VERSION = 3;

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
    adventures: createInitialAdventureProgress(),
    settings: { locale: "vi" },
    tutorial: createInitialTutorialProgress(),
  };
}
