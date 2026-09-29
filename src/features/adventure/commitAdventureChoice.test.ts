import { describe, expect, it } from "vitest";
import {
  mamChoices,
  mamClearingProblem,
  mushroomChoices,
  mushroomPathProblem,
  slimeChoices,
  slimeProblems,
} from "../../content/adventures/firstMaterials";
import { createInitialGameState, type GameState } from "../../game/domain/gameState";
import type { GameRepository } from "../../persistence/GameRepository";
import { createGameStore } from "../../state/gameStore";
import { commitAdventureChoice } from "./commitAdventureChoice";

const now = "2026-09-29T00:00:00.000Z";

class MemoryRepository implements GameRepository {
  saved: GameState | null = null;
  async load() { return this.saved; }
  async save(state: GameState) { this.saved = structuredClone(state); }
  async clear() { this.saved = null; }
}

async function atEncounter(encounter: "MUSHROOM_PATH" | "MAM_CLEARING" | "GLOWING_TREE" | "SLIME_CLEARING") {
  const repository = new MemoryRepository();
  repository.saved = createInitialGameState();
  repository.saved.tutorial = {
    multiplicationIntroStep: "COMPLETED",
    multiplicationIntroCompleted: true,
  };
  repository.saved.world.unlockedLocations = ["FOREST"];
  const store = await createGameStore(repository);
  store.getState().startFirstAdventure();
  for (const node of ["FOREST_ENTRANCE", "BERRY_GROVE", "MUSHROOM_PATH", "MAM_CLEARING", "GLOWING_TREE"] as const) {
    if (store.getState().adventures.currentNodeId === encounter) break;
    store.getState().completeAdventureEncounter(node);
  }
  return store;
}

describe("first adventure choice orchestration", () => {
  it("records wrong math attempts without progress or reward, then permits a correct retry", async () => {
    const store = await atEncounter("MUSHROOM_PATH");
    const record = store.getState().recordLearningAttempt;
    const wrong = commitAdventureChoice(mushroomPathProblem, mushroomChoices[1], false, now, record);
    expect(wrong.attempt.correct).toBe(false);
    expect(store.getState().learning.masteryByFact[wrong.attempt.factKey].skills.RECOGNIZE).toMatchObject({ attempts: 1, correct: 0 });
    expect(store.getState().adventures.currentNodeId).toBe("MUSHROOM_PATH");
    expect(store.getState().inventory).toEqual({ materials: 2, coins: 0 });

    const correct = commitAdventureChoice(mushroomPathProblem, mushroomChoices[0], true, now, record);
    expect(correct.correct).toBe(true);
    store.getState().completeAdventureEncounter("MUSHROOM_PATH");
    store.getState().completeAdventureEncounter("MUSHROOM_PATH");
    expect(store.getState().adventures.currentNodeId).toBe("MAM_CLEARING");
    expect(store.getState().inventory).toEqual({ materials: 4, coins: 0 });
    expect(store.getState().learning.masteryByFact[wrong.attempt.factKey].skills.RECOGNIZE).toMatchObject({ attempts: 2, correct: 1 });
  });

  it("keeps the Glowing Tree free of learning attempts and grants its coin once", async () => {
    const store = await atEncounter("GLOWING_TREE");
    const before = structuredClone(store.getState().learning);
    const coins = store.getState().inventory.coins;
    store.getState().completeAdventureEncounter("GLOWING_TREE");
    store.getState().completeAdventureEncounter("GLOWING_TREE");
    expect(store.getState().learning).toEqual(before);
    expect(store.getState().inventory.coins).toBe(coins + 1);
    expect(store.getState().adventures.currentNodeId).toBe("SLIME_CLEARING");
  });

  it("only completes the current battle round after a successful committed choice", async () => {
    const store = await atEncounter("SLIME_CLEARING");
    const record = store.getState().recordLearningAttempt;
    const wrong = commitAdventureChoice(slimeProblems[0], slimeChoices[0][1], false, now, record);
    store.getState().completeBattleRound(wrong);
    store.getState().completeAdventureEncounter("SLIME_CLEARING");
    expect(store.getState().adventures.battleRound).toBe(0);
    expect(store.getState().inventory).toEqual({ materials: 7, coins: 2 });

    const correct = commitAdventureChoice(slimeProblems[0], slimeChoices[0][0], true, now, record);
    store.getState().completeBattleRound(correct);
    store.getState().completeBattleRound(correct);
    expect(store.getState().adventures.battleRound).toBe(1);
    expect(store.getState().learning.masteryByFact[wrong.attempt.factKey].skills.RECOGNIZE).toMatchObject({ attempts: 2, correct: 1 });
  });

  it("records Mầm's wrong APPLY choice and allows a successful retry", async () => {
    const store = await atEncounter("MAM_CLEARING");
    const record = store.getState().recordLearningAttempt;
    const wrong = commitAdventureChoice(mamClearingProblem, mamChoices[0], false, now, record);
    expect(wrong.attempt).toMatchObject({ skill: "APPLY", correct: false });
    expect(store.getState().inventory.coins).toBe(0);
    const correct = commitAdventureChoice(mamClearingProblem, mamChoices[1], true, now, record);
    expect(correct.correct).toBe(true);
    store.getState().completeAdventureEncounter("MAM_CLEARING");
    expect(store.getState().inventory).toEqual({ materials: 7, coins: 1 });
  });
});
