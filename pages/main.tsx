import React from "react";
import ReactDOM from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";

document.documentElement.style.setProperty("--font-atkinson", "Atkinson Hyperlegible, Arial, sans-serif");
document.documentElement.style.setProperty("--font-geist-mono", "ui-monospace, SFMono-Regular, Menlo, monospace");
document.documentElement.style.setProperty("--font-lora", "Lora, Georgia, serif");

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><Home /></React.StrictMode>);
