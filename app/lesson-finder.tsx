"use client";
import { discoverLessons, purposes, routeContext, subjectsFor, times } from "./lesson-discovery";
import type { DiscoveryLesson, GradeSelection, Purpose, TimeChoice } from "./lesson-discovery";
import "./lesson-finder.css";

const fitLabels: Record<string, string> = {
  "Core lesson": "Suited to this grade range", "Teacher-led + core": "Use with teacher support",
  "Core + extension": "Core + extra challenge", "Teacher-led": "Teacher-guided adaptation", Extension: "Extra challenge",
};
export type FinderSelection = { time: TimeChoice; purpose: Purpose; subject: string; showAll: boolean };
export default function LessonFinder({ lessons, grade, onGrade, onPrepare, onQuestions, selection, onSelection }: {
  lessons: DiscoveryLesson[]; grade: GradeSelection; onGrade: (grade: GradeSelection) => void;
  selection: FinderSelection; onSelection: (selection: FinderSelection) => void;
  onPrepare: (id: string, steps: number[]) => void; onQuestions: () => void;
}) {
  const { time, purpose, subject, showAll } = selection;
  const subjects = [...new Set(lessons.flatMap(subjectsFor))].sort();
  const matches = discoverLessons(lessons, { grade, time, purpose, subject });
  const visible = showAll ? matches : matches.slice(0, 3);
  const clear = () => { onGrade("ALL"); onSelection({ time: "all", purpose: "all", subject: "all", showAll: false }); };
  return <section className="section page-section discovery-page">
    <div className="discovery-hero">
      <div><p className="eyebrow light"><span /> K–7 learning &amp; action</p><h1>Find your next<br /><em>learning adventure.</em></h1><p>Start with your learners, the time you have, and a question worth exploring.</p></div>
      <ol aria-label="Learning pathway"><li><b>01</b> Notice</li><li><b>02</b> Investigate</li><li><b>03</b> Act &amp; reflect</li></ol>
    </div>
    <section className="discovery-controls" aria-labelledby="discovery-title">
      <div className="discovery-controls-heading"><div><small>CHOOSE A STARTING POINT</small><h2 id="discovery-title">Make room for a good question.</h2></div><button type="button" onClick={clear}>Reset choices</button></div>
      <div className="discovery-filter-grid">
        <label>Grade range<select value={grade} onChange={e => { onGrade(e.target.value as GradeSelection); onSelection({ ...selection, showAll: false }); }}><option value="ALL">All grade bands</option>{["K–2", "3–5", "6–7"].map(band => <option key={band}>{band}</option>)}</select></label>
        <label>Time available<select value={time} onChange={e => { onSelection({ ...selection, time: e.target.value as TimeChoice, showAll: false }); }}>{times.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label>Learning purpose<select value={purpose} onChange={e => { onSelection({ ...selection, purpose: e.target.value as Purpose, showAll: false }); }}>{purposes.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label>Curriculum connection<select value={subject} onChange={e => { onSelection({ ...selection, subject: e.target.value, showAll: false }); }}><option value="all">Any subject connection</option>{subjects.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="discovery-guidance">Grade choices bring the closest fit first; adaptations remain available. Time uses the full upper estimate for an existing route, not a shortened lesson. Subject connections describe the whole lesson, so check the route before teaching.</p>
    </section>
    <div className="discovery-results-heading"><p role="status" aria-live="polite" aria-atomic="true"><b>{matches.length} matching {matches.length === 1 ? "lesson" : "lessons"}</b>{matches.length > 3 && !showAll ? " · showing three starting points" : " · showing all matches"}</p>{matches.length > 3 && <button type="button" aria-expanded={showAll} aria-controls="discovery-results" onClick={() => onSelection({ ...selection, showAll: !showAll })}>{showAll ? "Show three starting points" : `Show all ${matches.length} matches`}</button>}</div>
    {matches.length === 0 && <div className="discovery-empty"><h2>No route fits all those choices.</h2><p>Try a longer time or a different purpose. The full collection is still here.</p><button className="button dark" type="button" onClick={clear}>Reset and browse lessons</button></div>}
    <p className="discovery-print-note">Finder summary · {grade === "ALL" ? "All grade bands" : grade} · {times.find(item => item.value === time)?.label} · {purposes.find(item => item.value === purpose)?.label} · {subject === "all" ? "Any subject connection" : subject}. Showing {visible.length} of {matches.length} matches. Open preparation online for alternate routes, curriculum notes, sources and printable lesson packs.</p>
    <div className="discovery-results" id="discovery-results">
      {visible.map(({ lesson, routes }, index) => {
        const adaptation = grade === "ALL" ? null : lesson.teacher.adaptations.find(item => item.band === grade);
        const route = routes[0];
        return <article key={lesson.id} className={`discovery-card tone-${lesson.tone}`}>
          <figure><img src={lesson.image} alt="" width="1536" height="1024" loading="lazy" /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></figure>
          <div className="discovery-card-body">
            <p className="discovery-grade">{adaptation ? `${grade} · ${fitLabels[adaptation.fit] ?? adaptation.fit}` : "K–7 · grade guidance in preparation"}</p>
            <h2>{lesson.title}</h2><p className="discovery-question">{lesson.question}</p>
            {adaptation && <p className="discovery-adaptation">{adaptation.move}</p>}
            <div className="discovery-route"><small>{time === "all" && purpose === "all" ? "ONE AVAILABLE ROUTE" : "MATCHING ROUTE"}</small><h3>{route.title} <span>· {route.time}</span></h3>{routeContext(route) && <p className="discovery-context">{routeContext(route)}</p>}<p>{route.description}</p><button type="button" aria-label={`Prepare ${route.title}: ${lesson.title}`} onClick={() => onPrepare(lesson.id, route.steps)}>Prepare this route →</button></div>
            {routes.length > 1 && <details className="discovery-more"><summary>{routes.length - 1} other {time === "all" && purpose === "all" ? "available" : "matching"} {routes.length === 2 ? "route" : "routes"}</summary><ul>{routes.slice(1).map(other => <li key={other.title}><h3>{other.title} <span>· {other.time}</span></h3>{routeContext(other) && <p className="discovery-context">{routeContext(other)}</p>}<p>{other.description}</p><button type="button" onClick={() => onPrepare(lesson.id, other.steps)}>Prepare {other.title} →</button></li>)}</ul></details>}
            <details className="discovery-curriculum"><summary>Curriculum connections &amp; materials</summary><ul>{lesson.teacher.curriculum.map(item => <li key={item}>{item}</li>)}</ul><p><b>Materials:</b> {lesson.materials}</p><p>Choose only what the selected route needs. Preparation includes the exact print plan, original sources and care guidance.</p></details>
            <div className="discovery-print-links"><a href={lesson.printable.bwHref} target="_blank" rel="noreferrer">Full B&amp;W pack · {lesson.printable.pages} pages</a><a href={lesson.printable.href} target="_blank" rel="noreferrer">Colour pack</a></div>
          </div>
        </article>;
      })}
    </div>
    <aside className="discovery-beyond"><div><h2>Follow the question further.</h2><p>This finder covers the {lessons.length} core lesson packs. Maps, outdoor learning, rights &amp; expression, and the community calendar also have their own resources in the navigation.</p></div><button type="button" className="button secondary" onClick={onQuestions}>Browse big questions →</button></aside>
  </section>;
}
