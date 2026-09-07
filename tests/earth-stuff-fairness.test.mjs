import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Earth Month build has complete routes and a pinned source record',()=>{
  const html=readFileSync('pages-dist/earth-stuff-fairness/index.html','utf8');
  const data=JSON.parse(html.match(/<script id="pack-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.core.length,6);
  assert.equal(data.younger['K–2'].length,4);
  assert.equal(data.younger['3–5'].length,4);
  assert.equal(data.films.length,8);
  assert.equal(data.cases.length,8);
  assert.ok(data.core.every(a=>!(a.film||[]).includes('citizens')));
  assert.doesNotMatch(html,/<script[^>]+src=|<iframe|localStorage|fetch\(/);
  const release=JSON.parse(readFileSync('pages-dist/earth-stuff-fairness/release.json','utf8'));
  assert.equal(release.audience,'equity');
  assert.equal(release.sourceCommit,'d7bd8c264a417820c3c1a417e1070e885853bd33');
});
test('Existing Earth Day lesson is retained and new entry hides in projection',()=>{
  const pack=JSON.parse(readFileSync('content/master-inquiry-pack-v1.json','utf8'));
  assert.ok(pack.calendarProvocations.some(p=>p.id==='earth-day-systems'));
  assert.match(readFileSync('app/earth-month-entry.css','utf8'),/projector-on/);
  assert.match(readFileSync('pages/main.tsx','utf8'),/<EarthMonthEntry/);
});
