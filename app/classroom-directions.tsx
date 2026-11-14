"use client";
import { useRef, useState } from "react";
import "./classroom-directions.css";

/** Keep every instruction available; pacing is an optional presentation aid. */
export default function ClassroomDirections({ directions }: { directions: string[] }) {
  const [visible, setVisible] = useState(directions.length);
  const paced = visible < directions.length;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const revealNext = () => {
    const next = Math.min(directions.length, visible + 1);
    setVisible(next);
    if (next === directions.length) toggleRef.current?.focus();
  };
  return <section className="classroom-directions" aria-label="Student activity steps">
    <div className="classroom-direction-heading"><span className="direction-label">DO THIS NOW</span>
      {directions.length > 1 && <div className="classroom-pacing-controls">
        <button ref={toggleRef} type="button" aria-pressed={paced} onClick={() => setVisible(paced ? directions.length : 1)}>{paced ? "Show all steps" : "Focus on one step"}</button>
        {paced && <button type="button" onClick={revealNext}>Reveal next step →</button>}
      </div>}
    </div>
    <p className="classroom-step-count" role="status" aria-live="polite">{visible} of {directions.length} steps shown</p>
    <ol className="student-directions">{directions.map((direction, index) => <li key={direction} hidden={index >= visible}><b>{index + 1}</b><span>{direction}</span></li>)}</ol>
  </section>;
}
