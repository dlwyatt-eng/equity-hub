"use client";

import { useMemo, useState } from "react";
import masterPack from "../content/master-inquiry-pack-v1.json";
import "./master-inquiry-panels.css";

type ProjectionProps = {
  projectorMode: boolean;
  onEnterProjection: () => Promise<void>;
  onExitProjection: () => Promise<void>;
};

type CalendarProvocation = (typeof masterPack.calendarProvocations)[number];

const mapInquiry = masterPack.mapInquiry;

const mapStages = [
  { label: "NOTICE", sourceIndex: 0 },
  { label: "WONDER", sourceIndex: 1 },
  { label: "INVESTIGATE", sourceIndex: 2 },
  { label: "EVIDENCE", sourceIndex: 3 },
  { label: "POWER", sourceIndex: 4 },
  { label: "REIMAGINE", sourceIndex: 5 },
] as const;

const mapGradeMoves = [
  { band: "K–2", fit: "Teacher-led", move: "Compare a globe with one flat map. Name one thing the map shows and one thing it cannot show. Co-draw a map made for helping or caring." },
  { band: "3–5", fit: "Teacher-led + core", move: "Use the Africa/Greenland comparison, pre-labelled area bars, partner talk, and one sentence or drawing about map purpose." },
  { band: "6–8", fit: "Core lesson", move: "Compare two place pairs, weigh the area evidence, separate mathematical findings from a policy choice, and redesign a map purpose." },
  { band: "9–12", fit: "Extension", move: "Audit a textbook, news graphic, game, or AI-generated map and compare more than one equal-area projection using primary sources." },
];

const calendarGradeMoves = [
  { band: "K–2", move: "Teacher narrates one image or scenario. Learners notice aloud, sort with pictures, and co-create one small response." },
  { band: "3–5", move: "Use the core question, partner talk, icons or sentence frames, and one clearly modelled optional product." },
  { band: "6–8", move: "Run the full evidence-and-systems route. Students cite the source and name responsibility, power, and a realistic next check." },
  { band: "9–12", move: "Add a second primary source, policy or systems analysis, stakeholder perspectives, and a measurable follow-up." },
];

function MapPair({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "map-pair compact" : "map-pair"}>
      {mapInquiry.projectionCards.map((card) => (
        <figure key={card.name}>
          <img
            src={card.image}
            alt={`${card.name} world map projection. ${card.distorts}`}
            width="960"
            height="500"
          />
          <figcaption>
            <strong>{card.name}</strong>
            {!compact && <><span><b>Preserves:</b> {card.preserves}</span><span><b>Distorts:</b> {card.distorts}</span></>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProjectionControls({
  index,
  count,
  onBack,
  onNext,
  onExit,
}: {
  index: number;
  count: number;
  onBack: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  return (
    <div className="master-projection-controls">
      <button type="button" disabled={index === 0} onClick={onBack}>← Previous</button>
      <span aria-live="polite">{index + 1} / {count}</span>
      {index < count - 1
        ? <button type="button" className="primary-control" onClick={onNext}>Next →</button>
        : <button type="button" className="primary-control" onClick={onExit}>Finish ✓</button>}
      <button type="button" className="exit-projection" onClick={onExit}>Exit projection</button>
    </div>
  );
}

function EvidenceProtocolPanel({ titleId }: { titleId: string }) {
  const protocol = masterPack.evidenceProtocol;
  return (
    <section className="evidence-protocol-panel" aria-labelledby={titleId}>
      <div className="master-section-heading"><small>REUSABLE EVIDENCE ROUTINE</small><h2 id={titleId}>{protocol.title}</h2><p>{protocol.studentQuestion}</p></div>
      <div className="evidence-protocol-steps">{protocol.steps.map((item, index) => <article key={item.label}><b>{index + 1}</b><small>{item.label}</small><strong>{item.prompt}</strong><span>{item.move}</span></article>)}</div>
      <details className="uncertainty-ladder">
        <summary>Open the uncertainty ladder: questions, mistakes, strategic doubt, misinformation, and denialism</summary>
        <div>{protocol.uncertaintyLadder.map((item) => <article key={item.kind}><h3>{item.kind}</h3><p>{item.meaning}</p><strong>Teacher move: {item.teacherMove}</strong></article>)}</div>
      </details>
    </section>
  );
}

export function MapRepresentationInquiry({ projectorMode, onEnterProjection, onExitProjection }: ProjectionProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = mapStages[stageIndex];
  const step = mapInquiry.steps[stage.sourceIndex];

  if (projectorMode) {
    return (
      <section className="master-projector map-master-projector" aria-labelledby="map-projector-title">
        <div className="master-projector-stage">
          <p className="master-stage-kicker"><span>{stage.label}</span><b>{step.minutes} min</b></p>
          <h1 id="map-projector-title">{step.prompt}</h1>
          {stageIndex <= 1 && <MapPair compact />}
          {stageIndex === 2 && (
            <div className="projection-fact-grid">
              {mapInquiry.projectionCards.map((card) => <article key={card.name}><h2>{card.name}</h2><p><b>Preserves:</b> {card.preserves}</p><p><b>Distorts:</b> {card.distorts}</p><small>{card.care}</small></article>)}
            </div>
          )}
          {stageIndex === 3 && (
            <div className="area-comparison-grid">
              {mapInquiry.comparisons.map((comparison) => <article key={comparison.places}><b>{comparison.places}</b><span>{comparison.firstArea} · {comparison.secondArea}</span><strong>{comparison.relationship}</strong></article>)}
            </div>
          )}
          {stageIndex === 4 && (
            <div className="evidence-policy-split" role="img" aria-label="Separate map evidence from interpretation and policy choices">
              <span><b>EVIDENCE</b>What the area measurements establish</span><span><b>INTERPRETATION</b>What the pattern may mean</span><span><b>POLICY CHOICE</b>Which map fits a purpose</span>
            </div>
          )}
          {stageIndex === 5 && (
            <div className="reimagine-map-prompt"><strong>RELATIONSHIPS · LANGUAGE · WATERWAYS · SEASONS · STEWARDSHIP · FUTURE GENERATIONS</strong><p>{mapInquiry.placeExtension.prompt}</p></div>
          )}
          <ol className="master-directions">{step.directions.map((direction, index) => <li key={direction}><b>{index + 1}</b><span>{direction}</span></li>)}</ol>
        </div>
        <ProjectionControls
          index={stageIndex}
          count={mapStages.length}
          onBack={() => setStageIndex((current) => Math.max(0, current - 1))}
          onNext={() => setStageIndex((current) => Math.min(mapStages.length - 1, current + 1))}
          onExit={() => void onExitProjection()}
        />
      </section>
    );
  }

  return (
    <section className="map-inquiry-page section page-section" aria-labelledby="map-inquiry-title">
      <header className="master-inquiry-hero">
        <div>
          <p className="eyebrow dark"><span /> Standalone K–12 representation inquiry</p>
          <h1 id="map-inquiry-title">{mapInquiry.publicTitle}</h1>
          <p className="master-learning"><b>We are learning:</b> {mapInquiry.learning}</p>
          <p>{mapInquiry.why}</p>
          <div className="master-action-row">
            <button type="button" className="button primary" onClick={() => { setStageIndex(0); void onEnterProjection(); }}>Project the inquiry →</button>
            <button type="button" className="button secondary" onClick={() => window.print()}>Print this guide</button>
          </div>
        </div>
        <aside>
          <small>READY TO TEACH</small>
          <strong>{mapInquiry.timing}</strong>
          <span>{mapInquiry.coreGrades}</span>
          <p><b>Students make:</b> {mapInquiry.product}</p>
        </aside>
      </header>

      <section className="master-hook" aria-labelledby="map-hook-title">
        <div><small>PROJECTED HOOK · {mapInquiry.hook.duration}</small><h2 id="map-hook-title">See the distortion before naming it.</h2><p>{mapInquiry.hook.purpose}</p></div>
        <dl><div><dt>Before</dt><dd>{mapInquiry.hook.before}</dd></div><div><dt>Pause</dt><dd>{mapInquiry.hook.pause}</dd></div><div><dt>Bridge</dt><dd>{mapInquiry.hook.bridge}</dd></div><div><dt>Fallback</dt><dd>{mapInquiry.hook.fallback}</dd></div></dl>
      </section>

      <MapPair />

      <p className="map-source-note">Maps were generated locally from public-domain Natural Earth boundary data. See the third-party notice for provenance. The projection explanations and linked sources below should travel with the images.</p>

      <section className="map-path" aria-labelledby="map-path-title">
        <div className="master-section-heading"><small>PROJECTOR PATH</small><h2 id="map-path-title">Notice → Wonder → Investigate → Evidence → Power → Reimagine</h2></div>
        <div>{mapStages.map((item, index) => { const source = mapInquiry.steps[item.sourceIndex]; return <article key={item.label}><b>{index + 1}</b><small>{item.label} · {source.minutes} min</small><h3>{source.prompt}</h3><button type="button" onClick={() => { setStageIndex(index); void onEnterProjection(); }}>Project this screen →</button></article>; })}</div>
      </section>

      <section className="map-evidence" aria-labelledby="map-evidence-title">
        <div className="master-section-heading"><small>MEASURE BEFORE CONCLUDING</small><h2 id="map-evidence-title">Area evidence students can inspect</h2></div>
        <div className="area-comparison-grid">{mapInquiry.comparisons.map((comparison) => <article key={comparison.places}><b>{comparison.places}</b><span>{comparison.firstArea} · {comparison.secondArea}</span><strong>{comparison.relationship}</strong></article>)}</div>
      </section>

      <EvidenceProtocolPanel titleId="map-evidence-protocol-title" />

      <section className="word-help" aria-labelledby="map-words-title">
        <div className="master-section-heading"><small>WORD HELP</small><h2 id="map-words-title">Five words are enough to begin</h2></div>
        <div>{mapInquiry.vocabulary.map((item) => <article key={item.term}><b>{item.term}</b><span>{item.meaning}</span></article>)}</div>
      </section>

      <section className="master-grade-guide" aria-labelledby="map-grade-title">
        <div className="master-section-heading"><small>K–12 GRADE GUIDE</small><h2 id="map-grade-title">Keep the question. Change the depth.</h2></div>
        <div>{mapGradeMoves.map((item) => <article key={item.band}><b>{item.band}</b><span>{item.fit}</span><p>{item.move}</p></article>)}</div>
      </section>

      <section className="map-finish-grid">
        <article><small>SUCCESS LOOKS LIKE</small><ul>{mapInquiry.success.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><small>SUPPORT · CORE · EXTEND · OFFLINE</small><dl>{Object.entries(mapInquiry.routes).map(([label, route]) => <div key={label}><dt>{label}</dt><dd>{route}</dd></div>)}</dl></article>
      </section>

      <section className="place-extension" aria-labelledby="place-extension-title">
        <figure><img src="/images/media-literacy-source-check.webp" alt="Students compare photographs, notes, and source cards while checking representation and evidence." width="1536" height="1024" /></figure>
        <div><small>REPRESENTATION TRAVELS</small><h2 id="place-extension-title">Maps are one kind of representation.</h2><p>{mapInquiry.placeExtension.prompt}</p><strong>{mapInquiry.placeExtension.guardrail}</strong><div>{mapInquiry.placeExtension.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div></div>
      </section>

      <section className="master-sources" aria-labelledby="map-sources-title">
        <div className="master-section-heading"><small>PRIMARY AND TECHNICAL SOURCES</small><h2 id="map-sources-title">Open these before teaching a changing claim</h2></div>
        <div>{mapInquiry.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer"><b>{source.label}</b><span>{source.use}</span></a>)}</div>
        <p className="time-sensitive-note"><b>Time-sensitive guardrail:</b> {mapInquiry.timeSensitiveNote}</p>
      </section>
    </section>
  );
}

function ProvocationProjection({ provocation, screen, onExit, onScreen }: { provocation: CalendarProvocation; screen: number; onExit: () => void; onScreen: (index: number) => void }) {
  const earthImage = provocation.id === "earth-day-systems";
  return (
    <section className="calendar-provocations-shell calendar-projector master-projector" aria-labelledby="provocation-projector-title">
      <div className="master-projector-stage">
        <p className="master-stage-kicker"><span>{screen === 0 ? "HOOK" : screen === 1 ? "NOTICE + WONDER" : "DISCUSS + CREATE"}</span><b>{provocation.timing}</b></p>
        <h1 id="provocation-projector-title">{provocation.title}</h1>
        {screen === 0 && <><p className="projected-learning"><b>We are learning:</b> {provocation.learning}</p>{earthImage && <img className="calendar-hook-image" src="/images/climate-justice-action.webp" alt="Students and community members restore a stream, test water, plant native species, and map local climate action." width="1536" height="1024" />}<article className="projected-hook"><small>LOOK / LISTEN</small><p>{provocation.hook}</p><strong>{provocation.before}</strong></article></>}
        {screen === 1 && <div className="projected-provocation-grid"><article><small>NOTICE + WONDER</small><ol>{provocation.noticeWonder.map((item) => <li key={item}>{item}</li>)}</ol></article><article><small>QUESTIONS</small><ul>{provocation.questions.map((item) => <li key={item}>{item}</li>)}</ul></article></div>}
        {screen === 2 && <div className="projected-provocation-grid"><article><small>DISCUSS</small><p>{provocation.discussion}</p></article><article><small>OPTIONAL PRODUCT</small><p>{provocation.product}</p></article></div>}
      </div>
      <ProjectionControls index={screen} count={3} onBack={() => onScreen(Math.max(0, screen - 1))} onNext={() => onScreen(Math.min(2, screen + 1))} onExit={onExit} />
    </section>
  );
}

export function CalendarProvocationsPanel({ projectorMode, onEnterProjection, onExitProjection }: ProjectionProps) {
  const [selectedId, setSelectedId] = useState(masterPack.calendarProvocations[0].id);
  const [screen, setScreen] = useState(0);
  const selected = useMemo(() => masterPack.calendarProvocations.find((item) => item.id === selectedId) ?? masterPack.calendarProvocations[0], [selectedId]);

  if (projectorMode) {
    return <ProvocationProjection provocation={selected} screen={screen} onScreen={setScreen} onExit={() => void onExitProjection()} />;
  }

  const begin = (provocation: CalendarProvocation) => {
    setSelectedId(provocation.id);
    setScreen(0);
    void onEnterProjection();
  };

  return (
    <section id="calendar-provocations" className="calendar-provocations-shell" aria-labelledby="calendar-provocations-title">
      <header className="calendar-heading">
        <div><p className="eyebrow dark"><span /> Seven optional 20–60 minute pathways</p><h2 id="calendar-provocations-title">Calendar Provocations</h2><p>Fresh inquiries for familiar dates. Each one can stand alone: preparation, prompts, product, source, fallback, care, and K–12 guidance are all here.</p></div>
        <button type="button" className="button secondary" onClick={() => window.print()}>Print the inventory</button>
      </header>

      <section className="calendar-grade-guide" aria-labelledby="calendar-grade-title">
        <div className="master-section-heading"><small>K–12 ADAPTATION</small><h3 id="calendar-grade-title">Use the same question at a fitting depth</h3></div>
        <div>{calendarGradeMoves.map((item) => <article key={item.band}><b>{item.band}</b><p>{item.move}</p></article>)}</div>
      </section>

      <EvidenceProtocolPanel titleId="calendar-evidence-protocol-title" />

      <div className="provocation-list">
        {masterPack.calendarProvocations.map((provocation, index) => (
          <article id={`provocation-${provocation.id}`} className="calendar-provocation-card" tabIndex={-1} key={provocation.id} aria-labelledby={`provocation-title-${provocation.id}`}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{provocation.timing} · {provocation.lens}</small><h3 id={`provocation-title-${provocation.id}`}>{provocation.title}</h3><p><b>We are learning:</b> {provocation.learning}</p></div><button type="button" onClick={() => begin(provocation)}>Project 3 screens →</button></header>
            <div className="provocation-core">
              <section><small>PROJECTED HOOK</small><p>{provocation.hook}</p><strong>Before: {provocation.before}</strong></section>
              <section><small>NOTICE + WONDER</small><ul>{provocation.noticeWonder.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><small>INQUIRY QUESTIONS</small><ul>{provocation.questions.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><small>DISCUSS</small><p>{provocation.discussion}</p></section>
              <section><small>OPTIONAL PRODUCT</small><p>{provocation.product}</p></section>
              <section><small>CURRICULUM</small><p>{provocation.curriculum.join(" · ")}</p></section>
            </div>
            <div className="provocation-supports">
              <p><b>Ways to join:</b> {provocation.differentiation}</p>
              <p><b>Fallback:</b> {provocation.fallback}</p>
              <p><b>Avoid tokenism:</b> {provocation.antiTokenism}</p>
              <a href={provocation.source.href} target="_blank" rel="noreferrer">Open {provocation.source.label} ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export const masterInquiryVersion = masterPack.contentVersion;
