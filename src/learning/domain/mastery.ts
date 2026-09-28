import type { LearningSkill, MathOperation } from "./math";

export interface SkillMastery {
  attempts: number;
  correct: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  masteryScore: number;
  lastAttemptAt: string | null;
}

export interface FactMastery {
  factKey: string;
  operation: MathOperation;
  operands: number[];
  skills: Partial<Record<LearningSkill, SkillMastery>>;
}

export interface LearningAttempt {
  problemId: string;
  factKey: string;
  operation: MathOperation;
  operands: number[];
  skill: LearningSkill;
  correct: boolean;
  hintUsed: boolean;
  attemptedAt: string;
}

export interface LearningState {
  masteryByFact: Record<string, FactMastery>;
}
