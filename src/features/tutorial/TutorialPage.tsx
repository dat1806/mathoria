import { useRef, useState } from "react";
import {
  equalGroupsProblem,
  guidedPractice,
  repeatedAdditionProblem,
  type TutorialChoice,
} from "../../content/tutorials/multiplicationIntro";
import {
  evaluateExpressionSelection,
  evaluateProblem,
  selectHintLevel,
} from "../../learning/application/evaluateProblem";
import { t, type TranslationKey } from "../../i18n";
import { useGameStore } from "../../state/storeContext";

const objectEmoji = { sprout: "🌱", berry: "🍓", carrot: "🥕" } as const;

function Characters({ hinting = false }: { hinting?: boolean }) {
  return (
    <div className="characters" aria-hidden="true">
      <div className="hero-character"><span>🧒</span><i className="magic-staff">✦</i></div>
      <div className={`fox-character ${hinting ? "is-hinting" : ""}`}><span>🦊</span><i>✦</i></div>
    </div>
  );
}

function Dialogue({ children }: { children: React.ReactNode }) {
  return (
    <div className="dialogue">
      <strong>{t("tutorial.foxName")}</strong>
      <p>{children}</p>
    </div>
  );
}

function Groups({ groups, each, object }: { groups: number; each: number; object: string }) {
  return (
    <div className="learning-groups" aria-label={t("tutorial.groupCount", { groups, each })}>
      {Array.from({ length: groups }, (_, group) => (
        <div className="object-group" key={group}>
          {Array.from({ length: each }, (_, item) => <span key={item}>{object}</span>)}
        </div>
      ))}
    </div>
  );
}

function SceneButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button className="game-button" onClick={onClick}>{children}</button>;
}

function EqualGroupsActivity({ onComplete }: { onComplete: () => void }) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [baskets, setBaskets] = useState([0, 0, 0]);
  const recorded = useRef(false);
  const complete = baskets.every((count) => count === 2);
  const fillBasket = (index: number) => {
    setBaskets((current) => current.map((count, basketIndex) =>
      basketIndex === index ? Math.min(2, count + 1) : count));
  };
  const finish = () => {
    if (!recorded.current) {
      recorded.current = true;
      recordAttempt(evaluateProblem(
        equalGroupsProblem,
        6,
        false,
        new Date().toISOString(),
      ).attempt);
    }
    onComplete();
  };

  return (
    <section className="activity-panel">
      <h2>{t("tutorial.equalGroupsTitle")}</h2>
      <p>{t("tutorial.equalGroupsPrompt")}</p>
      <div className="basket-row">
        {baskets.map((count, index) => (
          <button
            className="basket"
            key={index}
            onClick={() => fillBasket(index)}
            aria-label={t("tutorial.basketLabel", { number: index + 1, count })}
          >
            <span className="basket-fruit">{"🍓".repeat(count)}</span>
            <span aria-hidden="true">🧺</span>
            <small>{count} / 2</small>
          </button>
        ))}
      </div>
      {complete ? (
        <div className="success-block">
          <p>{t("tutorial.groupsComplete")}</p>
          <div className="equation">2 + 2 + 2</div>
          <SceneButton onClick={finish}>{t("tutorial.seeAddition")}</SceneButton>
        </div>
      ) : null}
    </section>
  );
}

function RepeatedAddition({ onComplete }: { onComplete: () => void }) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [message, setMessage] = useState<"idle" | "wrong" | "correct">("idle");
  const answer = (value: number) => {
    const evaluation = evaluateProblem(
      repeatedAdditionProblem,
      value,
      message === "wrong",
      new Date().toISOString(),
    );
    recordAttempt(evaluation.attempt);
    setMessage(evaluation.correct ? "correct" : "wrong");
  };
  return (
    <section className="activity-panel">
      <h2>{t("tutorial.additionTitle")}</h2>
      <p>{t("tutorial.additionPrompt")}</p>
      <Groups groups={3} each={3} object="🍄" />
      <div className="answer-row">
        {[6, 9, 12].map((value) => (
          <button key={value} disabled={message === "correct"} onClick={() => answer(value)}>{value}</button>
        ))}
      </div>
      {message === "wrong" ? <Dialogue>{t("tutorial.gentleRetry")}</Dialogue> : null}
      {message === "correct" ? (
        <div className="success-block">
          <p>{t("tutorial.additionSuccess")}</p>
          <div className="equation">3 + 3 + 3 = 9</div>
          <SceneButton onClick={onComplete}>{t("tutorial.continue")}</SceneButton>
        </div>
      ) : null}
    </section>
  );
}

function GuidedPractice({ onComplete }: { onComplete: () => void }) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [index, setIndex] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);
  const item = guidedPractice[index];

  const answer = (choice: TutorialChoice) => {
    const attemptedAt = new Date().toISOString();
    const evaluation = choice.kind === "EXPRESSION"
      ? evaluateExpressionSelection(
          item.problem,
          { operation: choice.operation, operands: choice.operands },
          wrongAttempts > 0,
          attemptedAt,
        )
      : evaluateProblem(
          item.problem,
          choice.value,
          wrongAttempts > 0,
          attemptedAt,
        );
    recordAttempt(evaluation.attempt);
    if (evaluation.correct) setCorrect(true);
    else setWrongAttempts((count) => count + 1);
  };

  const next = () => {
    if (index === guidedPractice.length - 1) onComplete();
    else {
      setIndex((current) => current + 1);
      setWrongAttempts(0);
      setCorrect(false);
    }
  };

  const emoji = objectEmoji[item.object];
  return (
    <section className="activity-panel">
      <p className="step-chip">{index + 1} / {guidedPractice.length}</p>
      <h2>{t("tutorial.practiceTitle")}</h2>
      <p>{t(item.promptKey as TranslationKey)}</p>
      <Groups
        groups={item.problem.operands[0]}
        each={item.problem.operands[1]}
        object={emoji}
      />
      {wrongAttempts > 0 ? (
        <Dialogue>{t(`tutorial.hint${selectHintLevel(wrongAttempts)[0]}${selectHintLevel(wrongAttempts).slice(1).toLowerCase()}` as TranslationKey)}</Dialogue>
      ) : null}
      <div className="answer-row">
        {item.choices.map((choice) => (
          <button
            key={choice.label}
            disabled={correct}
            onClick={() => answer(choice)}
            aria-label={t("tutorial.answerLabel", {
              answer: choice.kind === "NUMBER" && choice.visualGroups
                ? t("tutorial.groupCount", {
                    groups: choice.visualGroups[0],
                    each: choice.visualGroups[1],
                  })
                : choice.label,
            })}
          >
            {choice.kind === "NUMBER" && choice.visualGroups ? (
              <span className="mini-groups" aria-hidden="true">
                {Array.from({ length: choice.visualGroups[0] }, (_, group) => (
                  <i key={group}>{emoji.repeat(choice.visualGroups?.[1] ?? 0)}</i>
                ))}
              </span>
            ) : choice.label}
          </button>
        ))}
      </div>
      {correct ? (
        <div className="success-block">
          <p>{t("tutorial.correct")}</p>
          <SceneButton onClick={next}>{t("tutorial.nextChallenge")}</SceneButton>
        </div>
      ) : null}
    </section>
  );
}

export function TutorialPage() {
  const step = useGameStore((state) => state.tutorial.multiplicationIntroStep);
  const advance = useGameStore((state) => state.advanceTutorial);
  const stepIndex = ["ARRIVAL", "MEET_FOX", "EQUAL_GROUPS", "REPEATED_ADDITION", "REVEAL_MULTIPLICATION", "GUIDED_PRACTICE", "FOREST_INVITATION", "COMPLETED"].indexOf(step);

  return (
    <main className="tutorial-world">
      <div className="sky-clouds" aria-hidden="true" />
      <header className="world-header">
        <div><span>✦</span><strong>{t("game.title")}</strong></div>
        <p>{t("tutorial.campName")}</p>
      </header>
      <div className="tutorial-progress" role="progressbar" aria-label={t("tutorial.progressLabel")} aria-valuenow={stepIndex + 1} aria-valuemin={1} aria-valuemax={8}>
        {Array.from({ length: 8 }, (_, index) => <i className={index <= stepIndex ? "active" : ""} key={index} />)}
      </div>
      <section className="camp-scene">
        <div className="forest-edge" aria-hidden="true">🌲 🌳 🌲 🌳 🌲</div>
        <div className="tent" aria-hidden="true">⛺</div>
        <div className="campfire" aria-hidden="true">🔥</div>
        <div className="forest-path" aria-hidden="true" />
        <Characters hinting={step === "REVEAL_MULTIPLICATION" || step === "GUIDED_PRACTICE"} />
        <div className="scene-content">
          {step === "ARRIVAL" ? <section className="story-panel"><h1>{t("tutorial.arrivalTitle")}</h1><p>{t("tutorial.arrivalBody")}</p><SceneButton onClick={advance}>{t("tutorial.arrivalAction")}</SceneButton></section> : null}
          {step === "MEET_FOX" ? <section className="story-panel"><Dialogue>{t("tutorial.meetFox")}</Dialogue><SceneButton onClick={advance}>{t("tutorial.helpFox")}</SceneButton></section> : null}
          {step === "EQUAL_GROUPS" ? <EqualGroupsActivity onComplete={advance} /> : null}
          {step === "REPEATED_ADDITION" ? <RepeatedAddition onComplete={advance} /> : null}
          {step === "REVEAL_MULTIPLICATION" ? <section className="activity-panel reveal-panel"><h2>{t("tutorial.revealTitle")}</h2><Groups groups={3} each={2} object="🍎" /><div className="equation muted">2 + 2 + 2 = 6</div><Dialogue>{t("tutorial.shorterWay")}</Dialogue><div className="equation magic-equation">3 × 2 = 6</div><p>{t("tutorial.revealMeaning")}</p><SceneButton onClick={advance}>{t("tutorial.tryTogether")}</SceneButton></section> : null}
          {step === "GUIDED_PRACTICE" ? <GuidedPractice onComplete={advance} /> : null}
          {step === "FOREST_INVITATION" ? <section className="story-panel forest-invitation"><h1>{t("tutorial.forestTitle")}</h1><Dialogue>{t("tutorial.forestInvite")}</Dialogue><SceneButton onClick={advance}>{t("tutorial.openPath")}</SceneButton></section> : null}
          {step === "COMPLETED" ? <section className="story-panel completion-panel"><div className="sparkle">✦</div><h1>{t("tutorial.readyTitle")}</h1><p>{t("tutorial.readyBody")}</p><div className="forest-ready">🌲 {t("tutorial.forestComingSoon")} →</div></section> : null}
        </div>
      </section>
    </main>
  );
}
