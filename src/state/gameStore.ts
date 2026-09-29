import { create, type StoreApi, type UseBoundStore } from "zustand";
import {
  completeFirstAdventureEncounter,
  completeCurrentBattleRound,
} from "../game/adventure/adventureProgress";
import {
  FIRST_ADVENTURE_ID,
  type FirstAdventureEncounterId,
} from "../game/adventure/firstAdventure";
import {
  createInitialGameState,
  type GameState,
} from "../game/domain/gameState";
import { applyReward, type Reward } from "../game/domain/rewards";
import type { LearningAttempt } from "../learning/domain/mastery";
import type { ProblemEvaluation } from "../learning/application/evaluateProblem";
import { updateSkillMastery } from "../learning/mastery/updateMastery";
import type { GameRepository } from "../persistence/GameRepository";
import { advanceMultiplicationTutorial } from "../tutorial/domain/tutorialProgress";

export interface GameActions {
  grantReward(reward: Reward): void;
  recordLearningAttempt(attempt: LearningAttempt): void;
  advanceTutorial(): void;
  startFirstAdventure(): void;
  completeAdventureEncounter(encounterId: FirstAdventureEncounterId): void;
  completeBattleRound(evaluation: ProblemEvaluation): void;
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
    tutorial: store.tutorial,
  };
}

export async function createGameStore(
  repository: GameRepository,
): Promise<BoundGameStore> {
  const loaded = await repository.load();
  const initialState = loaded ?? createInitialGameState();
  let persistenceQueue = Promise.resolve();

  const enqueuePersistence = (operation: () => Promise<void>): Promise<void> => {
    const result = persistenceQueue.then(operation, operation);
    persistenceQueue = result.catch(() => undefined);
    return result;
  };

  const useStore = create<GameStore>((set) => ({
    ...initialState,
    grantReward: (reward) => {
      set((state) => ({ inventory: applyReward(state.inventory, reward) }));
      const stateToSave = persistentState(useStore.getState());
      void enqueuePersistence(() => repository.save(stateToSave));
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
      const stateToSave = persistentState(useStore.getState());
      void enqueuePersistence(() => repository.save(stateToSave));
    },
    advanceTutorial: () => {
      set((state) => {
        const tutorial = advanceMultiplicationTutorial(state.tutorial);
        const completedNow =
          tutorial.multiplicationIntroCompleted &&
          !state.tutorial.multiplicationIntroCompleted;
        return {
          tutorial,
          world: completedNow
            ? {
                ...state.world,
                unlockedLocations: state.world.unlockedLocations.includes("FOREST")
                  ? state.world.unlockedLocations
                  : [...state.world.unlockedLocations, "FOREST"],
              }
            : state.world,
        };
      });
      const stateToSave = persistentState(useStore.getState());
      void enqueuePersistence(() => repository.save(stateToSave));
    },
    startFirstAdventure: () => {
      let started = false;
      set((state) => {
        if (
          !state.tutorial.multiplicationIntroCompleted ||
          !state.world.unlockedLocations.includes("FOREST") ||
          state.adventures.currentAdventureId !== null ||
          state.adventures.completedAdventureIds.includes(FIRST_ADVENTURE_ID)
        ) return state;
        started = true;
        return {
          adventures: {
            ...state.adventures,
            currentAdventureId: FIRST_ADVENTURE_ID,
            currentNodeId: "FOREST_ENTRANCE",
            completedEncounterIds: [],
            battleRound: 0,
          },
        };
      });
      if (started) {
        const stateToSave = persistentState(useStore.getState());
        void enqueuePersistence(() => repository.save(stateToSave));
      }
    },
    completeAdventureEncounter: (encounterId) => {
      let completed = false;
      set((state) => {
        const result = completeFirstAdventureEncounter(
          state.adventures,
          state.inventory,
          encounterId,
        );
        completed = result.completed;
        return result.completed
          ? { adventures: result.progress, inventory: result.inventory }
          : state;
      });
      if (completed) {
        const stateToSave = persistentState(useStore.getState());
        void enqueuePersistence(() => repository.save(stateToSave));
      }
    },
    completeBattleRound: (evaluation) => {
      let completed = false;
      set((state) => {
        const adventures = completeCurrentBattleRound(state.adventures, evaluation);
        completed = adventures !== state.adventures;
        return completed ? { adventures } : state;
      });
      if (completed) {
        const stateToSave = persistentState(useStore.getState());
        void enqueuePersistence(() => repository.save(stateToSave));
      }
    },
    resetGame: async () => {
      const resetState = createInitialGameState();
      set(resetState);
      await enqueuePersistence(async () => {
        await repository.clear();
        await repository.save(resetState);
      });
    },
  }));

  return useStore;
}
