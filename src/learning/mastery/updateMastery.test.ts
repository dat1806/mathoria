import { describe, expect, it } from "vitest";
import type { LearningAttempt } from "../domain/mastery";
import { updateSkillMastery } from "./updateMastery";

const attempt = (correct: boolean, attemptedAt = "2026-09-28T00:00:00.000Z"): LearningAttempt => ({
  problemId: "problem-1",
  factKey: "MULTIPLICATION:2:2",
  operation: "MULTIPLICATION",
  operands: [2, 2],
  skill: "CALCULATE",
  correct,
  hintUsed: !correct,
  attemptedAt,
});

describe("updateSkillMastery", () => {
  it("records a first correct attempt", () => {
    expect(updateSkillMastery(undefined, attempt(true))).toEqual({
      attempts: 1,
      correct: 1,
      consecutiveCorrect: 1,
      consecutiveWrong: 0,
      masteryScore: 10,
      lastAttemptAt: "2026-09-28T00:00:00.000Z",
    });
  });

  it("records a first wrong attempt without a negative score", () => {
    expect(updateSkillMastery(undefined, attempt(false))).toMatchObject({
      attempts: 1,
      correct: 0,
      consecutiveCorrect: 0,
      consecutiveWrong: 1,
      masteryScore: 0,
    });
  });

  it("counts consecutive correct answers", () => {
    const first = updateSkillMastery(undefined, attempt(true));
    expect(updateSkillMastery(first, attempt(true))).toMatchObject({
      attempts: 2,
      correct: 2,
      consecutiveCorrect: 2,
      consecutiveWrong: 0,
    });
  });

  it("resets consecutive correct answers after a wrong answer", () => {
    const first = updateSkillMastery(undefined, attempt(true));
    expect(updateSkillMastery(first, attempt(false))).toMatchObject({
      consecutiveCorrect: 0,
      consecutiveWrong: 1,
    });
  });

  it("resets consecutive wrong answers after a correct answer", () => {
    const first = updateSkillMastery(undefined, attempt(false));
    expect(updateSkillMastery(first, attempt(true))).toMatchObject({
      consecutiveCorrect: 1,
      consecutiveWrong: 0,
    });
  });
});
