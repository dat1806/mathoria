import {
  SAVE_VERSION,
  type GameState,
  type WorldStage,
} from "../game/domain/gameState";
import type {
  FactMastery,
  SkillMastery,
} from "../learning/domain/mastery";
import type {
  LearningSkill,
  MathOperation,
} from "../learning/domain/math";

const operations: MathOperation[] = ["MULTIPLICATION", "DIVISION"];
const stages: WorldStage[] = ["CAMP", "SETTLEMENT", "VILLAGE", "CASTLE", "KINGDOM"];
const skills: LearningSkill[] = [
  "RECOGNIZE",
  "CALCULATE",
  "APPLY",
  "CONSTRUCT",
  "MISSING_FACTOR",
  "FLUENCY",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => Number.isFinite(item));
const isNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;
const isNullableString = (value: unknown): value is string | null =>
  value === null || typeof value === "string";

function isSkillMastery(value: unknown): value is SkillMastery {
  if (!isRecord(value)) return false;
  return (
    isNonNegativeNumber(value.attempts) &&
    isNonNegativeNumber(value.correct) &&
    isNonNegativeNumber(value.consecutiveCorrect) &&
    isNonNegativeNumber(value.consecutiveWrong) &&
    isNonNegativeNumber(value.masteryScore) &&
    isNullableString(value.lastAttemptAt)
  );
}

function isFactMastery(value: unknown): value is FactMastery {
  if (
    !isRecord(value) ||
    typeof value.factKey !== "string" ||
    !operations.includes(value.operation as MathOperation) ||
    !isNumberArray(value.operands) ||
    !isRecord(value.skills)
  ) {
    return false;
  }

  return Object.entries(value.skills).every(
    ([skill, mastery]) =>
      skills.includes(skill as LearningSkill) && isSkillMastery(mastery),
  );
}

export function isGameState(value: unknown): value is GameState {
  if (!isRecord(value) || value.version !== SAVE_VERSION) return false;
  const { player, world, learning, inventory, adventures, settings } = value;
  if (
    !isRecord(player) ||
    (player.name !== undefined && typeof player.name !== "string") ||
    !isRecord(world) ||
    !stages.includes(world.stage as WorldStage) ||
    !isStringArray(world.unlockedLocations) ||
    !isStringArray(world.builtBuildings) ||
    !isRecord(learning) ||
    !isRecord(learning.masteryByFact) ||
    !Object.values(learning.masteryByFact).every(isFactMastery) ||
    !isRecord(inventory) ||
    !isNonNegativeNumber(inventory.materials) ||
    !isNonNegativeNumber(inventory.coins) ||
    !isRecord(adventures) ||
    !isNullableString(adventures.currentAdventureId) ||
    !isNullableString(adventures.currentNodeId) ||
    !isStringArray(adventures.completedAdventureIds) ||
    !isRecord(settings) ||
    settings.locale !== "vi"
  ) {
    return false;
  }
  return true;
}

export function migrateSave(rawSave: unknown): GameState | null {
  if (!isRecord(rawSave) || rawSave.version !== SAVE_VERSION) return null;
  return isGameState(rawSave) ? rawSave : null;
}
