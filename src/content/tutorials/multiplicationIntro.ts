import type {
  LearningSkill,
  MathOperation,
  MathProblem,
} from "../../learning/domain/math";

export interface NumericTutorialChoice {
  kind: "NUMBER";
  value: number;
  label: string;
  visualGroups?: readonly [groups: number, each: number];
}

export interface ExpressionTutorialChoice {
  kind: "EXPRESSION";
  operation: MathOperation;
  operands: readonly [number, number];
  label: string;
}

export type TutorialChoice = NumericTutorialChoice | ExpressionTutorialChoice;

export interface GuidedPracticeItem {
  problem: MathProblem;
  promptKey: string;
  object: "sprout" | "berry" | "carrot";
  choices: TutorialChoice[];
}

function problem(
  id: string,
  operands: [number, number],
  answer: number,
  skill: LearningSkill,
  representation: MathProblem["representation"],
): MathProblem {
  return {
    id,
    operation: "MULTIPLICATION",
    type: skill === "RECOGNIZE" ? "RECOGNIZE" : skill === "CONSTRUCT" ? "CONSTRUCT" : "APPLY",
    representation,
    operands,
    answer,
    difficulty: 1,
    skillIds: [skill],
    context: { theme: "GENERIC" },
  };
}

export const guidedPractice: readonly GuidedPracticeItem[] = [
  {
    problem: problem("intro-recognize-2x4", [2, 4], 8, "RECOGNIZE", "ARRAY"),
    promptKey: "tutorial.practiceRecognize",
    object: "sprout",
    choices: [
      { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 4], label: "2 × 4" },
      { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [4, 2], label: "4 × 2" },
      { kind: "EXPRESSION", operation: "MULTIPLICATION", operands: [2, 2], label: "2 × 2" },
    ],
  },
  {
    problem: problem("intro-construct-3x2", [3, 2], 6, "CONSTRUCT", "EQUAL_GROUPS"),
    promptKey: "tutorial.practiceConstruct",
    object: "berry",
    choices: [
      { kind: "NUMBER", value: 4, label: "2:2", visualGroups: [2, 2] },
      { kind: "NUMBER", value: 6, label: "3:2", visualGroups: [3, 2] },
      { kind: "NUMBER", value: 9, label: "3:3", visualGroups: [3, 3] },
    ],
  },
  {
    problem: problem("intro-apply-3x3", [3, 3], 9, "APPLY", "WORD_PROBLEM"),
    promptKey: "tutorial.practiceApply",
    object: "carrot",
    choices: [
      { kind: "NUMBER", value: 6, label: "6" },
      { kind: "NUMBER", value: 9, label: "9" },
      { kind: "NUMBER", value: 12, label: "12" },
    ],
  },
];

export const equalGroupsProblem = problem(
  "intro-equal-groups-3x2",
  [3, 2],
  6,
  "CONSTRUCT",
  "EQUAL_GROUPS",
);

export const repeatedAdditionProblem = problem(
  "intro-repeated-addition-3x3",
  [3, 3],
  9,
  "CALCULATE",
  "EQUAL_GROUPS",
);
