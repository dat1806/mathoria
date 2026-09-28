import { describe, expect, it } from "vitest";
import {
  createInitialGameState,
  type GameState,
} from "../game/domain/gameState";
import type { GameRepository } from "../persistence/GameRepository";
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
});
