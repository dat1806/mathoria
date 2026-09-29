import { describe, expect, it } from "vitest";
import {
  completeFirstAdventureEncounter,
  completeCurrentBattleRound,
  createInitialAdventureProgress,
  type AdventureProgressState,
} from "./adventureProgress";
import {
  FIRST_ADVENTURE_ID,
  firstAdventureEncounters,
  nextFirstAdventureEncounter,
} from "./firstAdventure";
import { slimeProblems } from "../../content/adventures/firstMaterials";
import { evaluateProblem } from "../../learning/application/evaluateProblem";

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
      if (encounter === "SLIME_CLEARING") {
        for (const problem of slimeProblems) {
          progress = completeCurrentBattleRound(
            progress,
            evaluateProblem(problem, problem.answer, false, "2026-09-29T00:00:00.000Z"),
          );
        }
      }
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

  it("requires three successful authored rounds before awarding the Slime reward", () => {
    let progress: AdventureProgressState = { ...activeProgress(), currentNodeId: "SLIME_CLEARING" };
    const inventory = { materials: 7, coins: 2 };
    const now = "2026-09-29T00:00:00.000Z";
    const wrong = evaluateProblem(slimeProblems[0], 0, false, now);
    const correctFirst = evaluateProblem(slimeProblems[0], 6, true, now);

    expect(completeCurrentBattleRound(progress, wrong)).toBe(progress);
    expect(completeFirstAdventureEncounter(progress, inventory, "SLIME_CLEARING").completed).toBe(false);
    progress = completeCurrentBattleRound(progress, correctFirst);
    expect(progress.battleRound).toBe(1);
    expect(completeCurrentBattleRound(progress, correctFirst)).toBe(progress);

    for (const problem of slimeProblems.slice(1)) {
      progress = completeCurrentBattleRound(progress, evaluateProblem(problem, problem.answer, false, now));
    }
    expect(progress.battleRound).toBe(3);
    expect(completeCurrentBattleRound(progress, evaluateProblem(slimeProblems[2], 8, false, now))).toBe(progress);
    const reward = completeFirstAdventureEncounter(progress, inventory, "SLIME_CLEARING");
    expect(reward.inventory).toEqual({ materials: 12, coins: 4 });
    expect(completeFirstAdventureEncounter(reward.progress, reward.inventory, "SLIME_CLEARING").inventory).toBe(reward.inventory);
  });
});
