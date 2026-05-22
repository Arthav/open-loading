import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@arthav/open-loading/styles.css";
import "./styles.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
