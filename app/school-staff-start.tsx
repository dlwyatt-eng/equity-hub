import "./school-staff-start.css";

type SchoolView = "action" | "outdoors" | "nature" | "rights";

export default function SchoolStaffStart({
  onNavigate,
  onLesson,
  onCalendar,
}: {
  onNavigate: (view: SchoolView) => void;
  onLesson: (id: string) => void;
  onCalendar: () => void;
}) {
  return (
    <section id="school-staff" className="school-staff section" aria-labelledby="school-staff-title">
      <div className="school-staff-heading">
        <div>
          <p className="eyebrow dark"><span /> For Walnut Road staff</p>
          <h2 id="school-staff-title" tabIndex={-1}>School connections &amp; starting points</h2>
          <p><strong>School contact: Daryl Wyatt</strong> for stewardship, social responsibility, outdoor education, student leadership and Spirit Crew, social justice and racial equity.</p>
          <p>Use the resources below to start a lesson or develop an idea for our school. Connect through our usual school channels for questions, resource requests and student-specific conversations.</p>
        </div>
        <aside className="school-staff-leadership" aria-labelledby="school-leadership-title">
          <small>STUDENT LEADERSHIP &amp; SPIRIT CREW</small>
          <h3 id="school-leadership-title">Student voice, belonging and action</h3>
          <p>First student leadership meeting: Friday, November 13.</p>
          <button type="button" onClick={() => onNavigate("action")}>Explore student action resources →</button>
        </aside>
      </div>

      <div className="school-staff-grid">
        <article>
          <span className="school-staff-number" aria-hidden="true">01</span>
          <h3>Stewardship</h3>
          <p>Notice what is happening in a local place, gather evidence and choose a manageable care-for-place action.</p>
          <button type="button" onClick={() => onNavigate("nature")}>Start with Nature Today →</button>
        </article>
        <article>
          <span className="school-staff-number" aria-hidden="true">02</span>
          <h3>Social responsibility</h3>
          <p>Explore belonging, access and classroom agreements. Give learners different ways to contribute.</p>
          <button type="button" onClick={() => onLesson("belonging-built")}>Prepare a belonging lesson →</button>
        </article>
        <article>
          <span className="school-staff-number" aria-hidden="true">03</span>
          <h3>Outdoor education</h3>
          <p>Choose a school-ground field journal or a Surrey place to explore. Review the preparation and access needs for your class.</p>
          <button type="button" onClick={() => onNavigate("outdoors")}>Open outdoor learning →</button>
        </article>
        <article>
          <span className="school-staff-number" aria-hidden="true">04</span>
          <h3>Student leadership &amp; Spirit Crew</h3>
          <p>Use listening, planning and reflection tools to turn a concern or a school-spirit idea into an inclusive next step.</p>
          <button type="button" onClick={() => onLesson("concern-to-action")}>Prepare From concern to action →</button>
        </article>
        <article>
          <span className="school-staff-number" aria-hidden="true">05</span>
          <h3>Social justice &amp; racial equity</h3>
          <p>Explore racism, human rights and freedom of expression with age-appropriate preparation, public sources and care for students.</p>
          <button type="button" onClick={() => onNavigate("rights")}>Open rights &amp; expression →</button>
        </article>
      </div>

      <div className="school-staff-planning">
        <div><h3>Planning ahead?</h3><p>The community calendar has date sources, grade pathways and short teaching ideas. An observance is a learning opportunity, not automatically a confirmed school event.</p></div>
        <button type="button" onClick={onCalendar}>Open the community calendar →</button>
      </div>
      <p className="school-staff-care">Plan for access, offer choices and avoid asking a student to represent a whole community. School approval and adult support are needed before outside contact, collections, fundraising or public sharing.</p>
    </section>
  );
}
