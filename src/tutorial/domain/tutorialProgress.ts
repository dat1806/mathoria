export const multiplicationTutorialSteps = [
  "ARRIVAL",
  "MEET_FOX",
  "EQUAL_GROUPS",
  "REPEATED_ADDITION",
  "REVEAL_MULTIPLICATION",
  "GUIDED_PRACTICE",
  "FOREST_INVITATION",
  "COMPLETED",
] as const;

export type MultiplicationTutorialStep =
  (typeof multiplicationTutorialSteps)[number];

export interface TutorialProgressState {
  multiplicationIntroStep: MultiplicationTutorialStep;
  multiplicationIntroCompleted: boolean;
}

export function createInitialTutorialProgress(): TutorialProgressState {
  return {
    multiplicationIntroStep: "ARRIVAL",
    multiplicationIntroCompleted: false,
  };
}

export function advanceMultiplicationTutorial(
  current: TutorialProgressState,
): TutorialProgressState {
  if (current.multiplicationIntroCompleted) return current;
  const currentIndex = multiplicationTutorialSteps.indexOf(
    current.multiplicationIntroStep,
  );
  const nextStep = multiplicationTutorialSteps[currentIndex + 1];
  if (nextStep === undefined) return current;
  return {
    multiplicationIntroStep: nextStep,
    multiplicationIntroCompleted: nextStep === "COMPLETED",
  };
}
