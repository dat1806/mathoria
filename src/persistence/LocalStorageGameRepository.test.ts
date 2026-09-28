import { describe, expect, it } from "vitest";
import { createInitialGameState } from "../game/domain/gameState";
import {
  GAME_SAVE_KEY,
  LocalStorageGameRepository,
} from "./LocalStorageGameRepository";
import type { StorageLike } from "./storage";

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

describe("LocalStorageGameRepository", () => {
  it("round trips a save", async () => {
    const repository = new LocalStorageGameRepository(new MemoryStorage());
    const state = createInitialGameState();
    state.inventory.materials = 5;
    await repository.save(state);
    await expect(repository.load()).resolves.toEqual(state);
  });

  it("returns null for a missing save", async () => {
    const repository = new LocalStorageGameRepository(new MemoryStorage());
    await expect(repository.load()).resolves.toBeNull();
  });

  it("recovers from invalid JSON and clears it", async () => {
    const storage = new MemoryStorage();
    storage.setItem(GAME_SAVE_KEY, "{not json");
    const repository = new LocalStorageGameRepository(storage);
    await expect(repository.load()).resolves.toBeNull();
    expect(storage.getItem(GAME_SAVE_KEY)).toBeNull();
  });

  it("recovers from an unsupported version", async () => {
    const storage = new MemoryStorage();
    storage.setItem(GAME_SAVE_KEY, JSON.stringify({ ...createInitialGameState(), version: 99 }));
    const repository = new LocalStorageGameRepository(storage);
    await expect(repository.load()).resolves.toBeNull();
    expect(storage.getItem(GAME_SAVE_KEY)).toBeNull();
  });

  it("migrates a Phase 01 save while preserving progress", async () => {
    const storage = new MemoryStorage();
    const current = createInitialGameState();
    const { tutorial: _tutorial, ...phaseOneState } = current;
    const phaseOneSave = {
      ...phaseOneState,
      version: 1,
      inventory: { materials: 12, coins: 7 },
      learning: {
        masteryByFact: {
          "MULTIPLICATION:2:2": {
            factKey: "MULTIPLICATION:2:2",
            operation: "MULTIPLICATION",
            operands: [2, 2],
            skills: {
              RECOGNIZE: {
                attempts: 1,
                correct: 1,
                consecutiveCorrect: 1,
                consecutiveWrong: 0,
                masteryScore: 10,
                lastAttemptAt: "2026-09-28T00:00:00.000Z",
              },
            },
          },
        },
      },
    };
    storage.setItem(GAME_SAVE_KEY, JSON.stringify(phaseOneSave));

    const migrated = await new LocalStorageGameRepository(storage).load();

    expect(migrated).toMatchObject({
      version: 2,
      inventory: { materials: 12, coins: 7 },
      tutorial: {
        multiplicationIntroStep: "ARRIVAL",
        multiplicationIntroCompleted: false,
      },
    });
    expect(migrated?.learning).toEqual(phaseOneSave.learning);
  });

  it("recovers from an invalid root structure", async () => {
    const storage = new MemoryStorage();
    storage.setItem(GAME_SAVE_KEY, JSON.stringify({ version: 1, inventory: null }));
    const repository = new LocalStorageGameRepository(storage);
    await expect(repository.load()).resolves.toBeNull();
  });

  it("clears a save", async () => {
    const storage = new MemoryStorage();
    const repository = new LocalStorageGameRepository(storage);
    await repository.save(createInitialGameState());
    await repository.clear();
    expect(storage.getItem(GAME_SAVE_KEY)).toBeNull();
  });
});
