import { Route, Routes } from "react-router-dom";
import { DebugPage } from "../features/debug/DebugPage";
import { TutorialPage } from "../features/tutorial/TutorialPage";
import { FirstAdventurePage } from "../features/adventure/FirstAdventurePage";
import { useGameStore } from "../state/storeContext";

function GameFlow() {
  const tutorialCompleted = useGameStore(
    (state) => state.tutorial.multiplicationIntroCompleted,
  );
  return tutorialCompleted ? <FirstAdventurePage /> : <TutorialPage />;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<GameFlow />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="*" element={<GameFlow />} />
    </Routes>
  );
}
