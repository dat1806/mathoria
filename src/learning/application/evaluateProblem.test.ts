import { describe, expect, it } from "vitest";
import { guidedPractice } from "../../content/tutorials/multiplicationIntro";
import { evaluateProblem, selectHintLevel } from "./evaluateProblem";

describe("tutorial learning integration", () => {
  it("records a correct recognized answer with the centralized fact key", () => {
    const result = evaluateProblem(
      guidedPractice[0].problem,
      8,
      false,
      "2026-09-28T00:00:00.000Z",
    );
    expect(result.correct).toBe(true);
    expect(result.attempt).toMatchObject({
      factKey: "MULTIPLICATION:2:4",
      skill: "RECOGNIZE",
      correct: true,
      hintUsed: false,
    });
  });

  it("records wrong supported attempts through the same model", () => {
    const result = evaluateProblem(
      guidedPractice[2].problem,
      6,
      true,
      "2026-09-28T00:00:00.000Z",
    );
    expect(result.attempt).toMatchObject({
      factKey: "MULTIPLICATION:3:3",
      skill: "APPLY",
      correct: false,
      hintUsed: true,
    });
  });

  it("progresses toward more concrete hints", () => {
    expect(selectHintLevel(1)).toBe("GROUPS");
    expect(selectHintLevel(2)).toBe("ADDITION");
    expect(selectHintLevel(3)).toBe("COUNTING");
  });
});
