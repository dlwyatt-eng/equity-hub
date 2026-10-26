import "./november-child-day.css";

export default function NovemberChildDay({ onLesson }: { onLesson: (id: string) => void }) {
  return (
    <section className="november-child-day" aria-labelledby="november-child-day-title">
      <div>
        <p className="november-child-day-date">NOVEMBER FOCUS · NOVEMBER 20</p>
        <h2 id="november-child-day-title">Children’s rights, belonging &amp; student voice</h2>
        <p><strong>National Child Day / World Children’s Day</strong></p>
        <p>What helps every child belong, take part and have a say? Learn about children’s rights, listen in different ways and choose one useful change for our school.</p>
        <p className="november-child-day-status">The optional learning pack includes a poster, teacher guide, K–3 and Grades 4–7 activities, and a Leadership / Spirit Crew listening project with adult follow-through.</p>
      </div>
      <nav aria-label="Existing resources for the November children’s rights focus">
        <button type="button" onClick={() => onLesson("rights-in-our-room")}>Explore children’s rights →</button>
        <button type="button" onClick={() => onLesson("belonging-built")}>Build belonging →</button>
        <button type="button" onClick={() => onLesson("concern-to-action")}>Plan a student-voice action →</button>
      </nav>
      <div className="november-child-day-downloads">
        <h3>Social justice through stories</h3>
        <p>With a partner, circulate among six thematic stations, choose from a selection of books, read or view together, discuss and create individual responses. Move flexibly over several sessions, with other teaching formats available; November 20 is a connection, not a completion deadline.</p>
        <a href="/downloads/social-justice-reading/index.html">Open the teacher lesson and reading package: lesson PDF, student booklet and six station signs</a>
      </div>
      <div className="november-child-day-downloads">
        <h3>Every child. Every right. · November toolkit</h3>
        <div className="november-download-links">
          <a href="/downloads/childrens-day-2026/Childrens-Day-2026-School-Learning-Pack.pdf" target="_blank" rel="noreferrer">Learning pack · 6-page PDF · 4.2 MB ↗</a>
          <a href="/downloads/childrens-day-2026/Childrens-Day-2026-Rights-Poster.png" target="_blank" rel="noreferrer">Rights poster · PNG · 2.7 MB ↗</a>
          <a href="/downloads/childrens-day-2026/Childrens-Day-2026-School-Pack.zip" download>All files · ZIP · 6 MB ↓</a>
          <a href="/downloads/childrens-day-2026/Childrens-Day-2026-Text-Companion.txt" target="_blank" rel="noreferrer">Text companion + source links ↗</a>
        </div>
        <p>Choose a pathway: K–3 on page 3; Grades 4–7 on page 4; Leadership / Spirit Crew on page 5, with adult follow-through on page 6.</p>
        <p className="november-download-note">Original, optional activities, not an official 2026 campaign theme or a scheduled school-wide event. The PDF is a print worksheet, not tagged or fillable; use the text companion to enlarge, adapt or read aloud. <a href="/downloads/childrens-day-2026/Read-me.txt" target="_blank" rel="noreferrer">Printing, use &amp; credits ↗</a></p>
      </div>
    </section>
  );
}
