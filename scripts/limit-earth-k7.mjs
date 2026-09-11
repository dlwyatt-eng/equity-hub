import { readFileSync, writeFileSync } from 'node:fs';
const path = 'public/earth-stuff-fairness/index.html';
let text = readFileSync(path, 'utf8');
text = text.replaceAll('6–8', '6–7');
text = text.replaceAll("['K–2','3–5','6–7','9–12']", "['K–2','3–5','6–7']");
text = text.replaceAll('<option>9–12</option>', '');
text = text.replaceAll("band==='9–12'||f.id!=='citizens'", "f.id!=='citizens'");
text = text.replaceAll("band==='9–12'?'Six investigations with additional source and policy analysis.':", '');
text = text.replaceAll("+(band==='9–12'?'<section class=\"extended note\"><b>Older-grade extension</b><p>'+esc(pack.advanced[a.id])+'</p></section>':'')", '');
text = text.replaceAll("+(band==='9–12'?'<p>Teacher extension: Buy, Use, Toss is a high-school resource, not a Grade 6 handout.</p>'+sourceList(['curriculum']):'')", '');
// Keep local presentation copy concise after the pinned Earth source is rebuilt.
const editorialCopy = [
  ['Earth Month · shared resources · fairer systems', 'Earth Month · fairer systems'],
  [' On Equity Hub this extends the existing “Earth Day: Which Change Can We Actually Track?” lesson. It stands alone; no other hub is required.', ''],
  ['Core learning uses supplied cards and classroom discussion without films or AI.', 'Use the supplied cards and discussion prompts with or without films.'],
  ['An optional Katzie source is provided in the action lesson; no invented “Indigenous voice” is supplied.', 'The action lesson includes a Katzie source.'],
  ['Teacher-authored learning activities with attributed external sources. No film files are copied. Source review (UTC):', 'Sources reviewed (UTC):'],
  [' This resource does not make the whole curriculum classroom-tested.', '']
];
for (const [before, after] of editorialCopy) text = text.replaceAll(before, after);
writeFileSync(path, text);
console.log('Earth routes limited to K–7.');
