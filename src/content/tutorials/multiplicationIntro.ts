import type { LearningSkill, MathProblem } from "../../learning/domain/math";

export interface TutorialChoice {
  value: number;
  label: string;
  visualGroups?: readonly [groups: number, each: number];
}

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
      { value: 8, label: "2 × 4" },
      { value: 16, label: "4 × 4" },
      { value: 4, label: "2 × 2" },
    ],
  },
  {
    problem: problem("intro-construct-3x2", [3, 2], 6, "CONSTRUCT", "EQUAL_GROUPS"),
    promptKey: "tutorial.practiceConstruct",
    object: "berry",
    choices: [
      { value: 4, label: "2:2", visualGroups: [2, 2] },
      { value: 6, label: "3:2", visualGroups: [3, 2] },
      { value: 9, label: "3:3", visualGroups: [3, 3] },
    ],
  },
  {
    problem: problem("intro-apply-3x3", [3, 3], 9, "APPLY", "WORD_PROBLEM"),
    promptKey: "tutorial.practiceApply",
    object: "carrot",
    choices: [
      { value: 6, label: "6" },
      { value: 9, label: "9" },
      { value: 12, label: "12" },
    ],
  },
];
