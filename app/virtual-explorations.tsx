"use client";
import register from "./generated/virtual-explorations.json";
import { ExplorationPlayer } from "./generated/exploration-player";

export function EquityExploration({ lessonId, step, teacher = false }: { lessonId: string; step?: number; teacher?: boolean }) {
  const placements = register.placements.filter(p => p.lessonId === lessonId && (step === undefined || p.step === step));
  return <>{placements.map(p => {
    const tour = register.trips.find(t => t.id === p.tourId);
    return tour ? <ExplorationPlayer key={`${p.tourId}:${step ?? 'prep'}`} tour={tour} audience={teacher ? 'teacher' : 'student'} /> : null;
  })}</>;
}
