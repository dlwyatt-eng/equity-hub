import "./earth-month-entry.css";

export default function EarthMonthEntry() {
  const base=typeof window!=="undefined" && window.location.pathname.startsWith("/equity-hub")?"/equity-hub/":"/";
  return <aside className="earth-hub-entry" aria-label="Earth Month resource pathway">
    <details>
      <summary>Earth Month · Earth, Stuff &amp; Fairness</summary>
      <p>Follow everyday objects, check environmental promises, ask who benefits, and try a change you can measure. This expands our existing Earth Day inquiry. Each route stands alone.</p>
      <nav aria-label="Choose an Earth Month grade route">{["K–2","3–5","6–7"].map(band=><a key={band} href={`${base}earth-stuff-fairness/?band=${encodeURIComponent(band)}`}>Grades {band} →</a>)}</nav>
      <p className="earth-entry-note">Built for our K–7 school. More complex ideas are adapted into age-appropriate questions instead of appearing as high-school routes. Includes optional Story of Stuff films, supplied activity cards, projection and low-ink student printing.</p>
    </details>
  </aside>;
}
