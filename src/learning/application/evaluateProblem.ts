import type { LearningAttempt } from "../domain/mastery";
import { createFactKey, type MathProblem } from "../domain/math";

export type HintLevel = "GROUPS" | "ADDITION" | "COUNTING";

export interface ProblemEvaluation {
  correct: boolean;
  attempt: LearningAttempt;
}

export function evaluateProblem(
  problem: MathProblem,
  answer: number,
  hintUsed: boolean,
  attemptedAt: string,
): ProblemEvaluation {
  const factKey = createFactKey(problem);
  const skill = problem.skillIds[0];
  if (skill === undefined) throw new Error("A problem must assess a learning skill");
  const correct = answer === problem.answer;
  return {
    correct,
    attempt: {
      problemId: problem.id,
      factKey,
      operation: problem.operation,
      operands: [...problem.operands],
      skill,
      correct,
      hintUsed,
      attemptedAt,
    },
  };
}

export function selectHintLevel(wrongAttempts: number): HintLevel {
  if (wrongAttempts <= 1) return "GROUPS";
  if (wrongAttempts === 2) return "ADDITION";
  return "COUNTING";
}
