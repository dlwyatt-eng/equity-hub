"use client";
import { useEffect, useState } from "react";
import { localDay } from "../content/community-dates.mjs";
import "./earth-month-entry.css";

export default function EarthMonthEntry({ seasonal = false }: { seasonal?: boolean }) {
  const [day, setDay] = useState(localDay);
  useEffect(() => {
    if (!seasonal) return;
    const update = () => setDay(localDay());
    const timer = window.setInterval(update, 60000);
    document.addEventListener("visibilitychange", update);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, [seasonal]);
  if (seasonal && day.slice(5, 7) !== "04") return null;
  const base=typeof window!=="undefined" && window.location.pathname.startsWith("/equity-hub")?"/equity-hub/":"/";
  return <aside className="earth-hub-entry" aria-label="Earth Month resource pathway">
    <details>
      <summary>Earth Month · Earth, Stuff &amp; Fairness</summary>
      <p>Follow everyday objects, check environmental promises, ask who benefits, and try a change you can measure.</p>
      <nav aria-label="Choose an Earth Month grade route">{["K–2","3–5","6–7"].map(band=><a key={band} href={`${base}earth-stuff-fairness/?band=${encodeURIComponent(band)}`}>Grades {band} →</a>)}</nav>
      <p className="earth-entry-note">Choose a grade route. Activities include Story of Stuff films, discussion cards and student print pages.</p>
    </details>
  </aside>;
}
