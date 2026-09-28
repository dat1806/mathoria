import { describe, expect, it } from "vitest";
import {
  equalGroupsProblem,
  guidedPractice,
  repeatedAdditionProblem,
} from "../../content/tutorials/multiplicationIntro";
import { updateSkillMastery } from "../mastery/updateMastery";
import {
  evaluateExpressionSelection,
  evaluateProblem,
  selectHintLevel,
} from "./evaluateProblem";

describe("tutorial learning integration", () => {
  it("recognizes the semantically matching expression", () => {
    const result = evaluateExpressionSelection(
      guidedPractice[0].problem,
      { operation: "MULTIPLICATION", operands: [2, 4] },
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

  it("rejects a wrong expression even when it has the same numeric result", () => {
    const result = evaluateExpressionSelection(
      guidedPractice[0].problem,
      { operation: "MULTIPLICATION", operands: [4, 2] },
      false,
      "2026-09-28T00:00:00.000Z",
    );
    expect(result).toMatchObject({
      correct: false,
      attempt: {
        factKey: "MULTIPLICATION:2:4",
        skill: "RECOGNIZE",
        correct: false,
      },
    });
  });

  it("records successful Equal Groups construction learning", () => {
    const result = evaluateProblem(
      equalGroupsProblem,
      6,
      false,
      "2026-09-28T00:00:00.000Z",
    );
    expect(result.attempt).toMatchObject({
      problemId: "intro-equal-groups-3x2",
      factKey: "MULTIPLICATION:3:2",
      skill: "CONSTRUCT",
      correct: true,
    });
  });

  it("records successful Repeated Addition learning", () => {
    const result = evaluateProblem(
      repeatedAdditionProblem,
      9,
      false,
      "2026-09-28T00:00:00.000Z",
    );
    expect(result.attempt).toMatchObject({
      problemId: "intro-repeated-addition-3x3",
      factKey: "MULTIPLICATION:3:3",
      skill: "CALCULATE",
      correct: true,
    });
  });

  it("keeps guided-practice attempts compatible with mastery updates", () => {
    const result = evaluateProblem(
      guidedPractice[1].problem,
      6,
      false,
      "2026-09-28T00:00:00.000Z",
    );
    const mastery = updateSkillMastery(undefined, result.attempt);
    expect(result.attempt).toMatchObject({ skill: "CONSTRUCT", correct: true });
    expect(mastery).toMatchObject({ attempts: 1, correct: 1 });
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
