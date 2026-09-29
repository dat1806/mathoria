import { describe, expect, it } from "vitest";
import {
  completeFirstAdventureEncounter,
  createInitialAdventureProgress,
  type AdventureProgressState,
} from "./adventureProgress";
import {
  FIRST_ADVENTURE_ID,
  firstAdventureEncounters,
  nextFirstAdventureEncounter,
} from "./firstAdventure";

function activeProgress(): AdventureProgressState {
  return {
    ...createInitialAdventureProgress(),
    currentAdventureId: FIRST_ADVENTURE_ID,
    currentNodeId: firstAdventureEncounters[0],
  };
}

describe("first adventure progress", () => {
  it("follows the authored encounter order", () => {
    expect(firstAdventureEncounters.map(nextFirstAdventureEncounter)).toEqual([
      "BERRY_GROVE",
      "MUSHROOM_PATH",
      "MAM_CLEARING",
      "GLOWING_TREE",
      "SLIME_CLEARING",
      "RETURN_TO_CAMP",
      null,
    ]);
  });

  it("awards each encounter once even when completion is repeated", () => {
    const entered = completeFirstAdventureEncounter(
      activeProgress(),
      { materials: 0, coins: 0 },
      "FOREST_ENTRANCE",
    );
    const gathered = completeFirstAdventureEncounter(
      entered.progress,
      entered.inventory,
      "BERRY_GROVE",
    );
    const duplicate = completeFirstAdventureEncounter(
      gathered.progress,
      gathered.inventory,
      "BERRY_GROVE",
    );

    expect(gathered.inventory).toEqual({ materials: 2, coins: 0 });
    expect(duplicate.completed).toBe(false);
    expect(duplicate.inventory).toBe(gathered.inventory);
    expect(duplicate.progress).toBe(gathered.progress);
  });

  it("finishes with the canonical total and completion marker", () => {
    let progress = activeProgress();
    let inventory = { materials: 0, coins: 0 };

    for (const encounter of firstAdventureEncounters) {
      const result = completeFirstAdventureEncounter(progress, inventory, encounter);
      expect(result.completed).toBe(true);
      progress = result.progress;
      inventory = result.inventory;
    }

    expect(inventory).toEqual({ materials: 12, coins: 4 });
    expect(progress.currentAdventureId).toBeNull();
    expect(progress.currentNodeId).toBeNull();
    expect(progress.completedAdventureIds).toEqual([FIRST_ADVENTURE_ID]);
    expect(progress.completedEncounterIds).toEqual(firstAdventureEncounters);
  });
});
