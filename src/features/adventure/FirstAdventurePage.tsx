import { useRef, useState } from "react";
import {
  berryGroveProblem,
  mamChoices,
  mamClearingProblem,
  mushroomChoices,
  mushroomPathProblem,
  slimeChoices,
  slimeProblems,
  type AdventureChoice,
} from "../../content/adventures/firstMaterials";
import {
  FIRST_ADVENTURE_ID,
  type FirstAdventureEncounterId,
} from "../../game/adventure/firstAdventure";
import {
  evaluateExpressionSelection,
  evaluateProblem,
} from "../../learning/application/evaluateProblem";
import { t, type TranslationKey } from "../../i18n";
import { useGameStore } from "../../state/storeContext";

function ResourceHud() {
  const materials = useGameStore((state) => state.inventory.materials);
  const coins = useGameStore((state) => state.inventory.coins);
  return (
    <div className="resource-hud" aria-label={`${t("adventure.materials")}: ${materials}, ${t("adventure.coins")}: ${coins}`}>
      <span>🪵 <strong>{materials}</strong></span>
      <span>🪙 <strong>{coins}</strong></span>
    </div>
  );
}

function Dialogue({ speaker, children, hint = false }: { speaker: string; children: React.ReactNode; hint?: boolean }) {
  return (
    <div className={`dialogue ${hint ? "hint-dialogue" : ""}`}>
      <strong>{speaker}</strong>
      <p>{children}</p>
    </div>
  );
}

function GameButton({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button className="game-button" disabled={disabled} onClick={onClick}>{children}</button>;
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

function AdventureFrame({ children, hinting = false, mam = false, slime = false }: { children: React.ReactNode; hinting?: boolean; mam?: boolean; slime?: boolean }) {
  return (
    <main className="adventure-world">
      <header className="world-header">
        <div><span>✦</span><strong>{t("adventure.title")}</strong></div>
        <ResourceHud />
      </header>
      <div className="forest-canopy" aria-hidden="true">🌲 🌳 🌲 🌳 🌲 🌳</div>
      <div className="forest-trail" aria-hidden="true" />
      <div className="adventure-characters" aria-hidden="true">
        <span className="adventure-hero">🧒<i>✦</i></span>
        <span className={`adventure-fox ${hinting ? "is-hinting" : ""}`}>🦊<i>✦</i></span>
        {mam ? <span className="mam-character">🦔<i>🍃</i></span> : null}
        {slime ? <span className="slime-character">●<i>⌣</i></span> : null}
      </div>
      <div className="adventure-content">{children}</div>
    </main>
  );
}

function RewardLine({ materials = 0, coins = 0 }: { materials?: number; coins?: number }) {
  return (
    <div className="reward-line">
      {materials > 0 ? <span>{t("adventure.rewardMaterials", { amount: materials })}</span> : null}
      {coins > 0 ? <span>{t("adventure.rewardCoins", { amount: coins })}</span> : null}
    </div>
  );
}

function BerryGrove({ complete }: { complete: () => void }) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [collected, setCollected] = useState([false, false, false]);
  const recorded = useRef(false);
  const ready = collected.every(Boolean);
  const finish = () => {
    if (!recorded.current) {
      recorded.current = true;
      recordAttempt(evaluateProblem(berryGroveProblem, 6, false, new Date().toISOString()).attempt);
    }
    complete();
  };
  return (
    <AdventureFrame>
      <section className="activity-panel forest-panel">
        <h1>{t("adventure.berryTitle")}</h1>
        <p>{t("adventure.berryPrompt")}</p>
        <div className="berry-bushes">
          {collected.map((isCollected, index) => (
            <button
              className={isCollected ? "berry-bush collected" : "berry-bush"}
              key={index}
              disabled={isCollected}
              onClick={() => setCollected((current) => current.map((value, item) => item === index ? true : value))}
              aria-label={t("adventure.berryLabel", { number: index + 1 })}
            >🌿<span>{isCollected ? "✨" : "🍓🍓"}</span></button>
          ))}
        </div>
        {ready ? <div className="success-block"><p>{t("adventure.berrySuccess")}</p><div className="equation muted">2 + 2 + 2 = 6 → 3 × 2 = 6</div><RewardLine materials={2} /><GameButton onClick={finish}>{t("adventure.collectReward")}</GameButton></div> : null}
      </section>
    </AdventureFrame>
  );
}

function MathChoiceEncounter({
  titleKey,
  promptKey,
  problem,
  choices,
  visual,
  reward,
  complete,
  mam = false,
}: {
  titleKey: TranslationKey;
  promptKey: TranslationKey;
  problem: typeof mushroomPathProblem;
  choices: readonly AdventureChoice[];
  visual: React.ReactNode;
  reward: { materials?: number; coins?: number };
  complete: () => void;
  mam?: boolean;
}) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);
  const answer = (choice: AdventureChoice) => {
    const attemptedAt = new Date().toISOString();
    const evaluation = choice.kind === "EXPRESSION"
      ? evaluateExpressionSelection(problem, choice, wrongAttempts > 0, attemptedAt)
      : evaluateProblem(problem, choice.value, wrongAttempts > 0, attemptedAt);
    recordAttempt(evaluation.attempt);
    if (evaluation.correct) setCorrect(true);
    else setWrongAttempts((value) => value + 1);
  };
  return (
    <AdventureFrame hinting={wrongAttempts > 0} mam={mam}>
      <section className="activity-panel forest-panel">
        <h1>{t(titleKey)}</h1>
        {mam ? <Dialogue speaker={t("adventure.mamName")}>{t("adventure.mamHello")}</Dialogue> : null}
        <p>{t(promptKey)}</p>
        {visual}
        {wrongAttempts > 0 ? <Dialogue speaker={t("tutorial.foxName")} hint>{t("adventure.wrongHint")}</Dialogue> : null}
        <div className="answer-row">
          {choices.map((choice) => <button key={choice.label} disabled={correct} onClick={() => answer(choice)}>{choice.label}</button>)}
        </div>
        {correct ? <div className="success-block">{mam ? <Dialogue speaker={t("adventure.mamName")}>{t("adventure.mamThanks")}</Dialogue> : <p>{t("tutorial.correct")}</p>}<RewardLine {...reward} /><GameButton onClick={complete}>{t("adventure.continue")}</GameButton></div> : null}
      </section>
    </AdventureFrame>
  );
}

function GlowingTree({ complete }: { complete: () => void }) {
  const [found, setFound] = useState(false);
  return (
    <AdventureFrame>
      <section className="story-panel forest-panel">
        <h1>{t("adventure.treeTitle")}</h1>
        <p>{t("adventure.treePrompt")}</p>
        <button className="glowing-tree" onClick={() => setFound(true)} aria-label={t("adventure.treeLabel")}>🌳<i>✦</i></button>
        {found ? <div className="success-block"><p>{t("adventure.treeFound")}</p><RewardLine coins={1} /><GameButton onClick={complete}>{t("adventure.takeCoin")}</GameButton></div> : null}
      </section>
    </AdventureFrame>
  );
}

function SlimeEncounter({ round, complete, advanceRound }: { round: number; complete: () => void; advanceRound: () => void }) {
  const recordAttempt = useGameStore((state) => state.recordLearningAttempt);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);
  if (round >= 3) {
    return <AdventureFrame slime><section className="story-panel forest-panel"><h1>{t("adventure.slimeTitle")}</h1><div className="slime-resolved">🟢 ↝ 😊</div><p>{t("adventure.slimeResolved")}</p><RewardLine materials={5} coins={2} /><GameButton onClick={complete}>{t("adventure.takeSlimeReward")}</GameButton></section></AdventureFrame>;
  }
  const problem = slimeProblems[round];
  const choices = slimeChoices[round];
  const prompts: TranslationKey[] = ["adventure.slimeRecognize", "adventure.slimeConstruct", "adventure.slimeCalculate"];
  const answer = (choice: AdventureChoice) => {
    const attemptedAt = new Date().toISOString();
    const evaluation = choice.kind === "EXPRESSION"
      ? evaluateExpressionSelection(problem, choice, wrongAttempts > 0, attemptedAt)
      : evaluateProblem(problem, choice.value, wrongAttempts > 0, attemptedAt);
    recordAttempt(evaluation.attempt);
    if (evaluation.correct) setCorrect(true);
    else setWrongAttempts((value) => value + 1);
  };
  const visual = round === 0
    ? <Groups groups={3} each={2} object="✨" />
    : round === 1
      ? <div className="equation muted">3 + 3 + 3</div>
      : <Groups groups={2} each={4} object="🔹" />;
  return (
    <AdventureFrame hinting={wrongAttempts > 0} slime>
      <section className="activity-panel forest-panel battle-panel">
        <p className="step-chip">{t("adventure.slimeRound", { round: round + 1 })}</p>
        <h1>{t("adventure.slimeTitle")}</h1>
        {round === 0 ? <Dialogue speaker={t("tutorial.foxName")}>{t("adventure.slimeHello")}</Dialogue> : null}
        <p>{t(prompts[round])}</p>
        {visual}
        {wrongAttempts > 0 ? <Dialogue speaker={t("tutorial.foxName")} hint>{t("adventure.wrongHint")}</Dialogue> : null}
        <div className="answer-row">{choices.map((choice) => <button key={choice.label} disabled={correct} onClick={() => answer(choice)}>{choice.label}</button>)}</div>
        {correct ? <div className="success-block magic-feedback"><p>{t("adventure.correctMagic")}</p><span aria-hidden="true">🪄 ✨ ✨</span><GameButton onClick={advanceRound}>{t("adventure.castMagic")}</GameButton></div> : null}
      </section>
    </AdventureFrame>
  );
}

export function FirstAdventurePage() {
  const currentAdventureId = useGameStore((state) => state.adventures.currentAdventureId);
  const currentNodeId = useGameStore((state) => state.adventures.currentNodeId) as FirstAdventureEncounterId | null;
  const completed = useGameStore((state) => state.adventures.completedAdventureIds.includes(FIRST_ADVENTURE_ID));
  const battleRound = useGameStore((state) => state.adventures.battleRound);
  const start = useGameStore((state) => state.startFirstAdventure);
  const completeEncounter = useGameStore((state) => state.completeAdventureEncounter);
  const advanceBattleRound = useGameStore((state) => state.advanceBattleRound);
  const complete = (encounter: FirstAdventureEncounterId) => () => completeEncounter(encounter);

  if (completed) {
    return <main className="tutorial-world camp-return"><header className="world-header"><div><span>✦</span><strong>{t("game.title")}</strong></div><ResourceHud /></header><section className="camp-scene"><div className="tent" aria-hidden="true">⛺</div><div className="farm-plot-tease" aria-hidden="true">✨ 🪧 ✨</div><div className="scene-content"><section className="story-panel"><h1>{t("adventure.completeTitle")}</h1><p>{t("adventure.completeBody")}</p><div className="forest-ready">🌱 {t("adventure.farmNext")}</div></section></div></section></main>;
  }

  if (currentAdventureId === null) {
    return <main className="tutorial-world"><header className="world-header"><div><span>✦</span><strong>{t("game.title")}</strong></div><ResourceHud /></header><section className="camp-scene"><div className="tent" aria-hidden="true">⛺</div><div className="farm-plot-tease" aria-hidden="true">🪧</div><div className="scene-content"><section className="story-panel"><h1>{t("adventure.campDepartureTitle")}</h1><p>{t("adventure.campDepartureBody")}</p><Dialogue speaker={t("tutorial.foxName")}>{t("adventure.campDepartureFox")}</Dialogue><GameButton onClick={start}>{t("adventure.start")}</GameButton></section></div></section></main>;
  }

  switch (currentNodeId) {
    case "FOREST_ENTRANCE": return <AdventureFrame><section className="story-panel forest-panel"><h1>{t("adventure.forestEntranceTitle")}</h1><p>{t("adventure.forestEntranceBody")}</p><GameButton onClick={complete("FOREST_ENTRANCE")}>{t("adventure.followPath")}</GameButton></section></AdventureFrame>;
    case "BERRY_GROVE": return <BerryGrove complete={complete("BERRY_GROVE")} />;
    case "MUSHROOM_PATH": return <MathChoiceEncounter titleKey="adventure.mushroomTitle" promptKey="adventure.mushroomPrompt" problem={mushroomPathProblem} choices={mushroomChoices} visual={<Groups groups={2} each={4} object="🍄" />} reward={{ materials: 2 }} complete={complete("MUSHROOM_PATH")} />;
    case "MAM_CLEARING": return <MathChoiceEncounter titleKey="adventure.mamTitle" promptKey="adventure.mamPrompt" problem={mamClearingProblem} choices={mamChoices} visual={<Groups groups={3} each={2} object="🥕" />} reward={{ materials: 3, coins: 1 }} complete={complete("MAM_CLEARING")} mam />;
    case "GLOWING_TREE": return <GlowingTree complete={complete("GLOWING_TREE")} />;
    case "SLIME_CLEARING": return <SlimeEncounter key={battleRound} round={battleRound} complete={complete("SLIME_CLEARING")} advanceRound={advanceBattleRound} />;
    case "RETURN_TO_CAMP": return <AdventureFrame><section className="story-panel forest-panel"><h1>{t("adventure.returnTitle")}</h1><p>{t("adventure.returnBody")}</p><GameButton onClick={complete("RETURN_TO_CAMP")}>{t("adventure.returnCamp")}</GameButton></section></AdventureFrame>;
    default: return null;
  }
}
