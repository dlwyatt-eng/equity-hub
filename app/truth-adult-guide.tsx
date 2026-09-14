import learning from "../content/truth-learning-2026.json";
import "./truth-adult-guide.css";

export default function TruthAdultGuide() {
  return <details className="truth-adult-guide">
    <summary>For adults: responding to denial and distortion</summary>
    <p>Welcome sincere questions. Correct inaccurate information without shaming a child or giving harmful claims a larger audience. Residential-school harms and Indigenous peoples’ basic rights are not class debate propositions.</p>
    <h3>Notice the question before naming the problem</h3>
    <ul>
      <li><b>An honest question</b> seeks an explanation or missing detail. Ask “What would you like to understand?” and answer the specific question using an appropriate source.</li>
      <li><b>A mistake or misinformation</b> is inaccurate information; someone may repeat it without knowing it is wrong. Correct the statement and check the source together. Do not infer a child’s motives.</li>
      <li><b>A different interpretation</b> may explain the meaning or causes of evidence differently while still accepting established facts. Ask what evidence supports it.</li>
      <li><b>Denial or distortion</b> rejects, minimizes or misrepresents documented harms. Repeated dismissal after clear evidence, selective quotation or shifting demands for proof can signal a pattern. One clumsy question is not enough to label a student a denialist.</li>
    </ul>
    <h3>A brief response you can use</h3>
    <blockquote>“You can ask questions here. Residential schools harmed Indigenous children, families and cultures. Survivors’ accounts and historical records establish that. Let’s identify your question and use a reliable source to understand it.”</blockquote>
    <ol>
      <li><b>Start with the established fact.</b> Name only the misconception that needs correcting. Avoid displaying inflammatory posts, repeating slogans or compiling claims for students to refute.</li>
      <li><b>Match the source to the question.</b> Phyllis Webstad speaks about her experience; NCTR explains the wider history; a specific Nation speaks about its own community. Written institutional records are not a superior form of truth that a Survivor must produce to be believed.</li>
      <li><b>Be precise about uncertainty.</b> Say “We need to check that detail” when appropriate. Questions about one record, date or investigation do not erase established harms. Do not guess findings or present work still underway as finished.</li>
      <li><b>Avoid false balance.</b> Giving an unsupported denial equal time alongside established evidence misleads learners about what is known. Study how we know and what responsibility follows.</li>
      <li><b>Return to learning.</b> Use a short, age-appropriate passage, then ask what it helps us understand. Indigenous children and families do not owe the class testimony or a rebuttal.</li>
    </ol>
    <h3>When to pause and seek support</h3>
    <p>Pause if comments target a student or community, learners become distressed, claims keep returning after correction, or a question needs knowledge you do not have. Say: “We will pause this discussion. I will check the question with the right support and come back to it.” Support affected learners privately, follow school procedures for discriminatory incidents, and consult your Indigenous Helping Teacher or district Indigenous Education team. Do not contact a Survivor or Nation expecting an immediate response to a classroom dispute.</p>
    <h3>Sources and next lessons</h3>
    <p>This is classroom guidance prepared for this hub, not a protocol authored or endorsed by NCTR or a Nation. It draws on NCTR’s call for truthful education and shared responsibility.</p>
    <ul>
      <li><a href="https://nctr.ca/research/reconciliation-begins-with-a-commitment-to-truth-telling/" target="_blank" rel="noreferrer">Stephanie Scott / NCTR · Reconciliation begins with a commitment to truth-telling (September 29, 2023) ↗</a></li>
      {learning.links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}
    </ul>
    <p><a href="https://dlwyatt-eng.github.io/teacher-hub/?view=Calendar+Provocations&provocation=truth-records-responsibility">Open the prepared Grade 6 source lesson ↗</a> · <a href="https://dlwyatt-eng.github.io/learn/#/truth-and-reconciliation">Student &amp; Family explanation ↗</a></p>
    <p>Planned learning: {learning.dates.learning} · display: {learning.dates.display} · Orange Shirt Day / National Day for Truth and Reconciliation: {learning.dates.national} · suggested responsibility follow-up: {learning.dates.checkBack}.</p>
  </details>;
}
