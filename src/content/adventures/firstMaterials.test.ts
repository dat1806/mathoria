import { describe, expect, it } from "vitest";
import {
  evaluateExpressionSelection,
  evaluateProblem,
} from "../../learning/application/evaluateProblem";
import {
  berryGroveProblem,
  mamClearingProblem,
  mushroomPathProblem,
  slimeProblems,
} from "./firstMaterials";
import { updateSkillMastery } from "../../learning/mastery/updateMastery";

const now = "2026-09-29T00:00:00.000Z";

describe("first adventure learning content", () => {
  it("defines learning encounters with the intended skills", () => {
    expect(berryGroveProblem.skillIds).toEqual(["CONSTRUCT"]);
    expect(mushroomPathProblem.skillIds).toEqual(["RECOGNIZE"]);
    expect(mamClearingProblem.skillIds).toEqual(["APPLY"]);
    expect(slimeProblems.map(({ skillIds }) => skillIds[0])).toEqual([
      "RECOGNIZE",
      "CONSTRUCT",
      "CALCULATE",
    ]);
  });

  it("evaluates equivalent-result expression choices semantically", () => {
    expect(evaluateExpressionSelection(
      mushroomPathProblem,
      { operation: "MULTIPLICATION", operands: [2, 4] },
      false,
      now,
    ).correct).toBe(true);
    expect(evaluateExpressionSelection(
      mushroomPathProblem,
      { operation: "MULTIPLICATION", operands: [4, 2] },
      false,
      now,
    ).correct).toBe(false);
  });

  it("records meaningful attempts for gathering, applying, and battle", () => {
    const gathering = evaluateProblem(berryGroveProblem, 6, false, now).attempt;
    const applying = evaluateProblem(mamClearingProblem, 6, false, now).attempt;
    const battleRecognize = evaluateExpressionSelection(
      slimeProblems[0],
      { operation: "MULTIPLICATION", operands: [3, 2] },
      false,
      now,
    ).attempt;
    const battleConstruct = evaluateExpressionSelection(
      slimeProblems[1],
      { operation: "MULTIPLICATION", operands: [3, 3] },
      false,
      now,
    ).attempt;
    const battleCalculate = evaluateProblem(slimeProblems[2], 8, false, now).attempt;

    expect([gathering, applying, battleRecognize, battleConstruct, battleCalculate]
      .map(({ skill, correct }) => [skill, correct])).toEqual([
      ["CONSTRUCT", true],
      ["APPLY", true],
      ["RECOGNIZE", true],
      ["CONSTRUCT", true],
      ["CALCULATE", true],
    ]);
  });

  it("records wrong committed answers and feeds correct answers through mastery", () => {
    const wrong = evaluateProblem(mamClearingProblem, 4, false, now);
    const correct = evaluateProblem(mamClearingProblem, 6, true, now);
    const mastery = updateSkillMastery(undefined, correct.attempt);

    expect(wrong).toMatchObject({ correct: false, attempt: { correct: false } });
    expect(mastery).toMatchObject({ attempts: 1, correct: 1, masteryScore: 10 });
  });
});
