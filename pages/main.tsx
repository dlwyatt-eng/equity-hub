import React from "react";
import ReactDOM from "react-dom/client";
import Home from "../app/page";
import EarthMonthEntry from "../app/earth-month-entry";
import "../app/globals.css";

if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--font-atkinson", "Atkinson Hyperlegible, Arial, sans-serif");
  document.documentElement.style.setProperty("--font-geist-mono", "ui-monospace, SFMono-Regular, Menlo, monospace");
  document.documentElement.style.setProperty("--font-lora", "Lora, Georgia, serif");
  const root = document.getElementById("root");
  if (root) ReactDOM.createRoot(root).render(<React.StrictMode><EarthMonthEntry /><Home /></React.StrictMode>);
}
