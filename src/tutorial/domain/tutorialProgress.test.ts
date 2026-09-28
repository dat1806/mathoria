import { describe, expect, it } from "vitest";
import {
  advanceMultiplicationTutorial,
  createInitialTutorialProgress,
} from "./tutorialProgress";

describe("multiplication tutorial progress", () => {
  it("starts at arrival", () => {
    expect(createInitialTutorialProgress()).toEqual({
      multiplicationIntroStep: "ARRIVAL",
      multiplicationIntroCompleted: false,
    });
  });

  it("moves forward one valid step", () => {
    expect(advanceMultiplicationTutorial(createInitialTutorialProgress()))
      .toMatchObject({ multiplicationIntroStep: "MEET_FOX" });
  });

  it("marks the tutorial complete after the forest invitation", () => {
    expect(advanceMultiplicationTutorial({
      multiplicationIntroStep: "FOREST_INVITATION",
      multiplicationIntroCompleted: false,
    })).toEqual({
      multiplicationIntroStep: "COMPLETED",
      multiplicationIntroCompleted: true,
    });
  });

  it("does not regress a completed tutorial", () => {
    const completed = {
      multiplicationIntroStep: "COMPLETED" as const,
      multiplicationIntroCompleted: true,
    };
    expect(advanceMultiplicationTutorial(completed)).toBe(completed);
  });
});
