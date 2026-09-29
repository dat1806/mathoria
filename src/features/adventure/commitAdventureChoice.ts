import type { AdventureChoice } from "../../content/adventures/firstMaterials";
import {
  evaluateExpressionSelection,
  evaluateProblem,
  type ProblemEvaluation,
} from "../../learning/application/evaluateProblem";
import type { LearningAttempt } from "../../learning/domain/mastery";
import type { MathProblem } from "../../learning/domain/math";

export function commitAdventureChoice(
  problem: MathProblem,
  choice: AdventureChoice,
  hintUsed: boolean,
  attemptedAt: string,
  recordAttempt: (attempt: LearningAttempt) => void,
): ProblemEvaluation {
  const evaluation = choice.kind === "EXPRESSION"
    ? evaluateExpressionSelection(problem, choice, hintUsed, attemptedAt)
    : evaluateProblem(problem, choice.value, hintUsed, attemptedAt);
  recordAttempt(evaluation.attempt);
  return evaluation;
}
