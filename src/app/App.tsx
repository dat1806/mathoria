import { Link, Route, Routes } from "react-router-dom";
import { DebugPage } from "../features/debug/DebugPage";
import { t } from "../i18n";

function HomePage() {
  return (
    <main className="shell">
      <section className="welcome-card" aria-labelledby="game-title">
        <div className="sparkle" aria-hidden="true">✦</div>
        <p className="eyebrow">Cozy Fantasy 2D</p>
        <h1 id="game-title">{t("game.title")}</h1>
        <p className="welcome-copy">{t("game.welcome")}</p>
        {import.meta.env.DEV && (
          <Link className="secondary-link" to="/debug">
            {t("game.debugLink")}
          </Link>
        )}
      </section>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
