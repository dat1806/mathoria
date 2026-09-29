import type { MathOperation, MathProblem } from "../../learning/domain/math";

export interface NumericChoice {
  kind: "NUMBER";
  value: number;
  label: string;
}

export interface ExpressionChoice {
  kind: "EXPRESSION";
  operation: MathOperation;
  operands: readonly [number, number];
  label: string;
}

export type AdventureChoice = NumericChoice | ExpressionChoice;

function problem(
  id: string,
  operands: [number, number],
  answer: number,
  type: MathProblem["type"],
  representation: MathProblem["representation"],
): MathProblem {
  return {
    id,
    operation: "MULTIPLICATION",
    type,
    representation,
    operands,
    answer,
    difficulty: 1,
    skillIds: [type],
    context: { theme: "FOREST" },
  };
}

export const berryGroveProblem = problem(
  "first-materials-berry-grove",
  [3, 2],
  6,
  "CONSTRUCT",
  "EQUAL_GROUPS",
);

export const mushroomPathProblem = problem(
  "first-materials-mushroom-path",
  [2, 4],
  8,
  "RECOGNIZE",
  "ARRAY",
);

export const mamClearingProblem = problem(
  "first-materials-mam-clearing",
  [3, 2],
  6,
  "APPLY",
  "WORD_PROBLEM",
);

export const slimeProblems: readonly MathProblem[] = [
  problem("first-materials-slime-recognize", [3, 2], 6, "RECOGNIZE", "EQUAL_GROUPS"),
  problem("first-materials-slime-construct", [3, 3], 9, "CONSTRUCT", "SYMBOLIC"),
  problem("first-materials-slime-calculate", [2, 4], 8, "CALCULATE", "ARRAY"),
];

export const mushroomChoices: readonly ExpressionChoice[] = [
  { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 4], label: "2 × 4" },
  { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [4, 2], label: "4 × 2" },
  { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 2], label: "2 × 2" },
];

export const mamChoices: readonly NumericChoice[] = [
  { kind: "NUMBER", value: 4, label: "4" },
  { kind: "NUMBER", value: 6, label: "6" },
  { kind: "NUMBER", value: 8, label: "8" },
];

export const slimeChoices: readonly (readonly AdventureChoice[])[] = [
  [
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [3, 2], label: "3 × 2" },
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 3], label: "2 × 3" },
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [3, 3], label: "3 × 3" },
  ],
  [
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [3, 3], label: "3 × 3" },
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [3, 2], label: "3 × 2" },
    { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 3], label: "2 × 3" },
  ],
  [
    { kind: "NUMBER", value: 6, label: "6" },
    { kind: "NUMBER", value: 8, label: "8" },
    { kind: "NUMBER", value: 10, label: "10" },
  ],
];
