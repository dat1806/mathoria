import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { LocalStorageGameRepository } from "./persistence/LocalStorageGameRepository";
import { createGameStore } from "./state/gameStore";
import { GameStoreContext } from "./state/storeContext";
import "./styles.css";

const repository = new LocalStorageGameRepository(window.localStorage);
const gameStore = await createGameStore(repository);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameStoreContext.Provider value={gameStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameStoreContext.Provider>
  </StrictMode>,
);
