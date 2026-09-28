import type { LearningAttempt, SkillMastery } from "../domain/mastery";

export const createInitialSkillMastery = (): SkillMastery => ({
  attempts: 0,
  correct: 0,
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  masteryScore: 0,
  lastAttemptAt: null,
});

export function updateSkillMastery(
  current: SkillMastery | undefined,
  attempt: LearningAttempt,
): SkillMastery {
  const previous = current ?? createInitialSkillMastery();
  return {
    attempts: previous.attempts + 1,
    correct: previous.correct + (attempt.correct ? 1 : 0),
    consecutiveCorrect: attempt.correct ? previous.consecutiveCorrect + 1 : 0,
    consecutiveWrong: attempt.correct ? 0 : previous.consecutiveWrong + 1,
    masteryScore: Math.max(
      0,
      Math.min(100, previous.masteryScore + (attempt.correct ? 10 : -5)),
    ),
    lastAttemptAt: attempt.attemptedAt,
  };
}
