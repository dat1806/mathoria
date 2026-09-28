import { Link } from "react-router-dom";
import { createFactKey } from "../../learning/domain/math";
import type { LearningAttempt } from "../../learning/domain/mastery";
import { useGameStore } from "../../state/storeContext";

const sampleFact = {
  operation: "MULTIPLICATION" as const,
  operands: [2, 2],
};

function sampleAttempt(correct: boolean): LearningAttempt {
  return {
    problemId: "debug:sample:2x2",
    factKey: createFactKey(sampleFact),
    operation: sampleFact.operation,
    operands: sampleFact.operands,
    skill: "CALCULATE",
    correct,
    hintUsed: !correct,
    attemptedAt: new Date().toISOString(),
  };
}

export function DebugPage() {
  const state = useGameStore((current) => current);

  return (
    <main className="debug-shell">
      <header className="debug-header">
        <div>
          <p className="eyebrow">Developer tooling</p>
          <h1>Mathoria state inspector</h1>
        </div>
        <Link className="secondary-link" to="/">Back to shell</Link>
      </header>

      <section className="debug-card" aria-label="Debug actions">
        <h2>Actions</h2>
        <div className="action-grid">
          <button onClick={() => state.grantReward({ type: "MATERIAL", amount: 5 })}>
            Grant 5 Materials
          </button>
          <button onClick={() => state.grantReward({ type: "COIN", amount: 5 })}>
            Grant 5 Coins
          </button>
          <button onClick={() => state.recordLearningAttempt(sampleAttempt(true))}>
            Record Sample Correct Attempt
          </button>
          <button onClick={() => state.recordLearningAttempt(sampleAttempt(false))}>
            Record Sample Wrong Attempt
          </button>
          <button className="reset-button" onClick={() => void state.resetGame()}>
            Reset Game
          </button>
        </div>
      </section>

      <section className="debug-card" aria-label="Current game state">
        <h2>Persistent state</h2>
        <dl className="state-summary">
          <div><dt>Save version</dt><dd>{state.version}</dd></div>
          <div><dt>Locale</dt><dd>{state.settings.locale}</dd></div>
          <div><dt>World stage</dt><dd>{state.world.stage}</dd></div>
          <div><dt>Materials</dt><dd>{state.inventory.materials}</dd></div>
          <div><dt>Coins</dt><dd>{state.inventory.coins}</dd></div>
          <div><dt>Built buildings</dt><dd>{state.world.builtBuildings.length}</dd></div>
          <div><dt>Completed adventures</dt><dd>{state.adventures.completedAdventureIds.length}</dd></div>
        </dl>
        <h3>Learning mastery</h3>
        <pre>{JSON.stringify(state.learning.masteryByFact, null, 2)}</pre>
      </section>
    </main>
  );
}
