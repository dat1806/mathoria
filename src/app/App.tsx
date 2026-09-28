import { Route, Routes } from "react-router-dom";
import { DebugPage } from "../features/debug/DebugPage";
import { TutorialPage } from "../features/tutorial/TutorialPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TutorialPage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="*" element={<TutorialPage />} />
    </Routes>
  );
}
