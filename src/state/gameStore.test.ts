import { describe, expect, it } from "vitest";
import type { GameState } from "../game/domain/gameState";
import type { GameRepository } from "../persistence/GameRepository";
import { createGameStore } from "./gameStore";

class MemoryRepository implements GameRepository {
  saved: GameState | null = null;
  async load() { return this.saved; }
  async save(state: GameState) { this.saved = structuredClone(state); }
  async clear() { this.saved = null; }
}

describe("game store", () => {
  it("autosaves reward updates", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().grantReward({ type: "MATERIAL", amount: 5 });
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
    const mastery = store.getState().learning.masteryByFact["MULTIPLICATION:2:2"];
    expect(mastery.skills.CALCULATE?.correct).toBe(1);
    expect(repository.saved?.learning.masteryByFact["MULTIPLICATION:2:2"]).toEqual(mastery);
  });

  it("resets and clears persisted progress", async () => {
    const repository = new MemoryRepository();
    const store = await createGameStore(repository);
    store.getState().grantReward({ type: "COIN", amount: 5 });
    await store.getState().resetGame();
    expect(store.getState().inventory.coins).toBe(0);
    expect(repository.saved).toBeNull();
  });
});
