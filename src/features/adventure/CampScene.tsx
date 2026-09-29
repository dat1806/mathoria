import { t } from "../../i18n";
import { useGameStore } from "../../state/storeContext";

function CampResources() {
  const materials = useGameStore((state) => state.inventory.materials);
  const coins = useGameStore((state) => state.inventory.coins);

  return (
    <div className="camp-resources" aria-label={`${t("adventure.materials")}: ${materials}, ${t("adventure.coins")}: ${coins}`}>
      <span className="camp-resource" title={t("adventure.materials")}>
        <img src="/assets/camp-integrated/log.webp" alt="" />
        <strong>{materials}</strong>
      </span>
      <span className="camp-resource" title={t("adventure.coins")}>
        <span className="camp-coin-icon" aria-hidden="true">✦</span>
        <strong>{coins}</strong>
      </span>
    </div>
  );
}

export function CampScene({ completed, onStart }: { completed: boolean; onStart?: () => void }) {
  return (
    <main className={`production-camp${completed ? " is-complete" : ""}`}>
      <div className="camp-atmosphere" aria-hidden="true" />
      <div className="camp-ground" aria-hidden="true" />
      <div className="camp-path" aria-hidden="true" />

      <div className="camp-back-layer" aria-hidden="true">
        <img className="camp-sprite camp-tree camp-tree-left" src="/assets/camp-integrated/tree-02.webp" alt="" />
        <img className="camp-sprite camp-tree camp-tree-center" src="/assets/camp-integrated/tree-03.webp" alt="" />
        <img className="camp-sprite camp-tree camp-tree-right" src="/assets/camp-integrated/tree-02.webp" alt="" />
      </div>

      <div className="camp-world-layer" aria-hidden="true">
        <img className="camp-sprite camp-tent" src="/assets/camp-integrated/tent.webp" alt="" />
        <img className="camp-sprite camp-fire" src="/assets/camp-integrated/campfire.webp" alt="" />
        <img className="camp-sprite camp-plot" src="/assets/camp-integrated/farm-plot-empty.webp" alt="" />
        <img className="camp-sprite camp-sign" src="/assets/camp-integrated/farm-sign.webp" alt="" />
        <img className="camp-sprite camp-log" src="/assets/camp-integrated/log.webp" alt="" />
        <img className="camp-sprite camp-rock" src="/assets/camp-integrated/rock-01.webp" alt="" />
      </div>

      <div className="camp-character-layer" aria-hidden="true">
        <img className="camp-sprite camp-hero" src="/assets/camp-integrated/hero-idle.webp" alt="" />
        <img className="camp-sprite camp-fox" src="/assets/camp-integrated/fox-idle.webp" alt="" />
      </div>

      <div className="camp-front-layer" aria-hidden="true">
        <img className="camp-sprite camp-flower camp-flower-left" src="/assets/camp-integrated/flowers-01.webp" alt="" />
        <img className="camp-sprite camp-flower camp-flower-right" src="/assets/camp-integrated/flowers-01.webp" alt="" />
      </div>

      <div className="camp-ui-layer">
        <header className="camp-topline">
          <strong className="camp-wordmark">{t("game.title")}</strong>
          <CampResources />
        </header>

        <section className="camp-dialogue" aria-labelledby="camp-story-title">
          <div className="camp-dialogue-copy">
            <h1 id="camp-story-title">{t(completed ? "adventure.completeTitle" : "adventure.campDepartureTitle")}</h1>
            <p>{t(completed ? "adventure.completeBody" : "adventure.campDepartureBody")}</p>
            {completed ? (
              <p className="camp-next-objective">{t("adventure.farmNext")}</p>
            ) : (
              <p className="camp-fox-line"><strong>{t("tutorial.foxName")}</strong> {t("adventure.campDepartureFox")}</p>
            )}
          </div>
          {onStart ? <button className="game-button camp-start" onClick={onStart}>{t("adventure.start")}</button> : null}
        </section>
      </div>
    </main>
  );
}
