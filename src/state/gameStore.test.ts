import { describe, expect, it } from "vitest";
import {
  createInitialGameState,
  type GameState,
} from "../game/domain/gameState";
import type { GameRepository } from "../persistence/GameRepository";
import { firstAdventureEncounters } from "../game/adventure/firstAdventure";
import { slimeProblems } from "../content/adventures/firstMaterials";
import { evaluateProblem } from "../learning/application/evaluateProblem";
import { createGameStore } from "./gameStore";

class MemoryRepository implements GameRepository {
  saved: GameState | null = null;
  clearCalls = 0;
  async load() { return this.saved; }
  async save(state: GameState) { this.saved = structuredClone(state); }
  async clear() {
    this.clearCalls += 1;
    this.saved = null;
  }
}

function createDeferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((complete) => {
    resolve = complete;
  });
  return { promise, resolve };
}

class DelayedRepository implements GameRepository {
  saved: GameState | null = null;
  saveCalls: GameState[] = [];
  pendingSaves: ReturnType<typeof createDeferred>[] = [];

  async load() { return null; }
  async save(state: GameState) {
    const deferred = createDeferred();
    const snapshot = structuredClone(state);
    this.saveCalls.push(snapshot);
    this.pendingSaves.push(deferred);
    await deferred.promise;
    this.saved = snapshot;
  }
  async clear() { this.saved = null; }
}

const flushPromises = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe("game store", () => {
  it("autosaves reward updates", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().grantReward({ type: "MATERIAL", amount: 5 });
    await flushPromises();
    expect(store.getState().inventory.materials).toBe(5);
    expect(repository.saved?.inventory.materials).toBe(5);
  });

  it("updates mastery and autosaves a learning attempt", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().recordLearningAttempt({
      problemId: "sample",
      factKey: "MULTIPLICATION:2:2",
      operation: "MULTIPLICATION",
      operands: [2, 2],
      skill: "CALCULATE",
      correct: true,
      hintUsed: false,
      attemptedAt: "2026-09-28T00:00:00.000Z",
    });
    await flushPromises();
    const mastery = store.getState().learning.masteryByFact["MULTIPLICATION:2:2"];
    expect(mastery.skills.CALCULATE?.correct).toBe(1);
    expect(repository.saved?.learning.masteryByFact["MULTIPLICATION:2:2"]).toEqual(mastery);
  });

  it("orders rapid persistence writes so the newest state is saved last", async () => {
    const repository = new DelayedRepository();
    const store = await createGameStore(repository);

    store.getState().grantReward({ type: "MATERIAL", amount: 5 });
    store.getState().grantReward({ type: "MATERIAL", amount: 5 });
    await flushPromises();

    expect(repository.saveCalls).toHaveLength(1);
    expect(repository.saveCalls[0].inventory.materials).toBe(5);

    repository.pendingSaves[0].resolve();
    await flushPromises();

    expect(repository.saveCalls).toHaveLength(2);
    expect(repository.saveCalls[1].inventory.materials).toBe(10);

    repository.pendingSaves[1].resolve();
    await flushPromises();

    expect(repository.saved?.inventory.materials).toBe(10);
  });

  it("resets, clears, and persists the canonical initial state", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().grantReward({ type: "COIN", amount: 5 });
    await store.getState().resetGame();

    const expectedInitialState = createInitialGameState();
    expect(repository.clearCalls).toBe(1);
    expect(repository.saved).toEqual(expectedInitialState);
    expect({
      version: store.getState().version,
      player: store.getState().player,
      world: store.getState().world,
      learning: store.getState().learning,
      inventory: store.getState().inventory,
      adventures: store.getState().adventures,
      settings: store.getState().settings,
      tutorial: store.getState().tutorial,
    }).toEqual(expectedInitialState);
  });

  it("persists tutorial progress and unlocks only the Forest hook on completion", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);

    for (let index = 0; index < 7; index += 1) {
      store.getState().advanceTutorial();
    }
    await flushPromises();

    expect(store.getState().tutorial).toEqual({
      multiplicationIntroStep: "COMPLETED",
      multiplicationIntroCompleted: true,
    });
    expect(store.getState().world.unlockedLocations).toEqual(["FOREST"]);
    expect(repository.saved?.tutorial).toEqual(store.getState().tutorial);

    const resumed = await createGameStore(repository);
    expect(resumed.getState().tutorial.multiplicationIntroCompleted).toBe(true);
    expect(resumed.getState().tutorial.multiplicationIntroStep).toBe("COMPLETED");
  });

  it("persists and resumes first-adventure checkpoints", async () => {
    const repository = new MemoryRepository();
    repository.saved = createInitialGameState();
    repository.saved.tutorial = {
      multiplicationIntroStep: "COMPLETED",
      multiplicationIntroCompleted: true,
    };
    repository.saved.world.unlockedLocations = ["FOREST"];
    const store = await createGameStore(repository);

    store.getState().startFirstAdventure();
    store.getState().completeAdventureEncounter("FOREST_ENTRANCE");
    store.getState().completeAdventureEncounter("BERRY_GROVE");
    await flushPromises();

    const resumed = await createGameStore(repository);
    expect(resumed.getState().adventures.currentNodeId).toBe("MUSHROOM_PATH");
    expect(resumed.getState().inventory).toEqual({ materials: 2, coins: 0 });
  });

  it("starts the first adventure only after the tutorial unlocks Forest", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().startFirstAdventure();
    expect(store.getState().adventures.currentAdventureId).toBeNull();

    for (let index = 0; index < 7; index += 1) store.getState().advanceTutorial();
    store.getState().startFirstAdventure();
    expect(store.getState().adventures).toMatchObject({
      currentAdventureId: "FIRST_MATERIALS",
      currentNodeId: "FOREST_ENTRANCE",
    });
  });

  it("keeps encounter rewards idempotent across repeated actions", async () => {
    const repository = new MemoryRepository();
    repository.saved = createInitialGameState();
    repository.saved.tutorial = {
      multiplicationIntroStep: "COMPLETED",
      multiplicationIntroCompleted: true,
    };
    repository.saved.world.unlockedLocations = ["FOREST"];
    const store = await createGameStore(repository);
    store.getState().startFirstAdventure();
    store.getState().completeAdventureEncounter("FOREST_ENTRANCE");
    store.getState().completeAdventureEncounter("BERRY_GROVE");
    store.getState().completeAdventureEncounter("BERRY_GROVE");
    await flushPromises();

    expect(store.getState().inventory.materials).toBe(2);
    expect(repository.saved?.inventory.materials).toBe(2);
  });

  it("persists battle rounds and the complete adventure reward total", async () => {
    const repository = new MemoryRepository();
    repository.saved = createInitialGameState();
    repository.saved.tutorial = {
      multiplicationIntroStep: "COMPLETED",
      multiplicationIntroCompleted: true,
    };
    repository.saved.world.unlockedLocations = ["FOREST"];
    const store = await createGameStore(repository);
    store.getState().startFirstAdventure();
    for (const encounter of firstAdventureEncounters.slice(0, 5)) {
      store.getState().completeAdventureEncounter(encounter);
    }
    store.getState().completeBattleRound(evaluateProblem(slimeProblems[0], 6, false, "2026-09-29T00:00:00.000Z"));
    await flushPromises();

    const resumedBattle = await createGameStore(repository);
    expect(resumedBattle.getState().adventures.currentNodeId).toBe("SLIME_CLEARING");
    expect(resumedBattle.getState().adventures.battleRound).toBe(1);

    resumedBattle.getState().completeBattleRound(evaluateProblem(slimeProblems[1], 9, false, "2026-09-29T00:00:00.000Z"));
    resumedBattle.getState().completeBattleRound(evaluateProblem(slimeProblems[2], 8, false, "2026-09-29T00:00:00.000Z"));
    resumedBattle.getState().completeAdventureEncounter("SLIME_CLEARING");
    resumedBattle.getState().completeAdventureEncounter("RETURN_TO_CAMP");
    await flushPromises();

    expect(resumedBattle.getState().inventory).toEqual({ materials: 12, coins: 4 });
    expect(resumedBattle.getState().adventures.completedAdventureIds).toEqual([
      "FIRST_MATERIALS",
    ]);
    expect(repository.saved?.inventory).toEqual({ materials: 12, coins: 4 });

    const resumedComplete = await createGameStore(repository);
    expect(resumedComplete.getState().adventures.currentAdventureId).toBeNull();
    expect(resumedComplete.getState().adventures.completedAdventureIds).toContain(
      "FIRST_MATERIALS",
    );
  });
});
