export type MathOperation = "MULTIPLICATION" | "DIVISION";

export type LearningSkill =
  | "RECOGNIZE"
  | "CALCULATE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR"
  | "FLUENCY";

export type ProblemType =
  | "CALCULATE"
  | "RECOGNIZE"
  | "APPLY"
  | "CONSTRUCT"
  | "MISSING_FACTOR";

export type ProblemRepresentation =
  | "SYMBOLIC"
  | "EQUAL_GROUPS"
  | "ARRAY"
  | "WORD_PROBLEM";

export interface MathFact {
  operation: MathOperation;
  operands: number[];
  result: number;
}

export type ProblemTheme = "FOREST" | "FARM" | "BATTLE" | "GENERIC";

export interface ProblemContext {
  theme?: ProblemTheme;
  actor?: string;
  object?: string;
}

export interface MathProblem {
  id: string;
  operation: MathOperation;
  type: ProblemType;
  representation: ProblemRepresentation;
  operands: number[];
  answer: number;
  choices?: number[];
  difficulty: number;
  skillIds: LearningSkill[];
  context?: ProblemContext;
}

export function createFactKey(
  fact: Pick<MathFact, "operation" | "operands">,
): string {
  return `${fact.operation}:${fact.operands.join(":")}`;
}
