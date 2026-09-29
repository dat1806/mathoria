import {
  FIRST_ADVENTURE_ID,
  firstAdventureRewards,
  nextFirstAdventureEncounter,
  type FirstAdventureEncounterId,
} from "./firstAdventure";
import type { InventoryState } from "../domain/gameState";
import { applyReward } from "../domain/rewards";

export interface AdventureProgressState {
  currentAdventureId: string | null;
  currentNodeId: string | null;
  completedAdventureIds: string[];
  completedEncounterIds: string[];
  battleRound: number;
}

export function createInitialAdventureProgress(): AdventureProgressState {
  return {
    currentAdventureId: null,
    currentNodeId: null,
    completedAdventureIds: [],
    completedEncounterIds: [],
    battleRound: 0,
  };
}

export interface EncounterCompletion {
  progress: AdventureProgressState;
  inventory: InventoryState;
  completed: boolean;
}

export function completeFirstAdventureEncounter(
  progress: AdventureProgressState,
  inventory: InventoryState,
  encounterId: FirstAdventureEncounterId,
): EncounterCompletion {
  if (
    progress.currentAdventureId !== FIRST_ADVENTURE_ID ||
    progress.currentNodeId !== encounterId ||
    progress.completedEncounterIds.includes(encounterId)
  ) {
    return { progress, inventory, completed: false };
  }

  const completedEncounterIds = [...progress.completedEncounterIds, encounterId];
  const rewards = firstAdventureRewards[encounterId] ?? [];
  const updatedInventory = rewards.reduce(applyReward, inventory);
  const nextEncounter = nextFirstAdventureEncounter(encounterId);
  const adventureFinished = nextEncounter === null;

  return {
    progress: {
      ...progress,
      currentAdventureId: adventureFinished ? null : FIRST_ADVENTURE_ID,
      currentNodeId: nextEncounter,
      completedEncounterIds,
      completedAdventureIds: adventureFinished &&
        !progress.completedAdventureIds.includes(FIRST_ADVENTURE_ID)
        ? [...progress.completedAdventureIds, FIRST_ADVENTURE_ID]
        : progress.completedAdventureIds,
      battleRound: encounterId === "SLIME_CLEARING" ? 0 : progress.battleRound,
    },
    inventory: updatedInventory,
    completed: true,
  };
}
