import { create, type StoreApi, type UseBoundStore } from "zustand";
import {
  createInitialGameState,
  type GameState,
} from "../game/domain/gameState";
import { applyReward, type Reward } from "../game/domain/rewards";
import type { LearningAttempt } from "../learning/domain/mastery";
import { updateSkillMastery } from "../learning/mastery/updateMastery";
import type { GameRepository } from "../persistence/GameRepository";

export interface GameActions {
  grantReward(reward: Reward): void;
  recordLearningAttempt(attempt: LearningAttempt): void;
  resetGame(): Promise<void>;
}

export type GameStore = GameState & GameActions;
export type BoundGameStore = UseBoundStore<StoreApi<GameStore>>;

function persistentState(store: GameStore): GameState {
  return {
    version: store.version,
    player: store.player,
    world: store.world,
    learning: store.learning,
    inventory: store.inventory,
    adventures: store.adventures,
    settings: store.settings,
  };
}

export async function createGameStore(
  repository: GameRepository,
): Promise<BoundGameStore> {
  const loaded = await repository.load();
  const initialState = loaded ?? createInitialGameState();

  const useStore = create<GameStore>((set) => ({
    ...initialState,
    grantReward: (reward) => {
      set((state) => ({ inventory: applyReward(state.inventory, reward) }));
      void repository.save(persistentState(useStore.getState()));
    },
    recordLearningAttempt: (attempt) => {
      set((state) => {
        const currentFact = state.learning.masteryByFact[attempt.factKey];
        const updatedSkill = updateSkillMastery(
          currentFact?.skills[attempt.skill],
          attempt,
        );
        return {
          learning: {
            masteryByFact: {
              ...state.learning.masteryByFact,
              [attempt.factKey]: {
                factKey: attempt.factKey,
                operation: attempt.operation,
                operands: [...attempt.operands],
                skills: { ...currentFact?.skills, [attempt.skill]: updatedSkill },
              },
            },
          },
        };
      });
      void repository.save(persistentState(useStore.getState()));
    },
    resetGame: async () => {
      set(createInitialGameState());
      await repository.clear();
    },
  }));

  return useStore;
}
