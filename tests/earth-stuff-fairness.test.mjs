import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Earth Month build exposes only K–7 routes and keeps complete core materials',()=>{
  const html=readFileSync('pages-dist/earth-stuff-fairness/index.html','utf8');
  const data=JSON.parse(html.match(/<script id="pack-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.core.length,6);
  assert.equal(data.younger['K–2'].length,4);
  assert.equal(data.younger['3–5'].length,4);
  assert.equal(data.cases.length,8);
  assert.match(html,/<option>K–2<\/option><option>3–5<\/option><option>6–7<\/option>/);
  assert.doesNotMatch(html,/<option>9–12<\/option>/);
  assert.ok(data.core.every(a=>!(a.film||[]).includes('citizens')));
  assert.doesNotMatch(html,/<script[^>]+src=|<iframe|localStorage|fetch\(/);
  const release=JSON.parse(readFileSync('pages-dist/earth-stuff-fairness/release.json','utf8'));
  assert.equal(release.audience,'equity');
  assert.equal(release.sourceCommit,'d7bd8c264a417820c3c1a417e1070e885853bd33');
});
test('Existing Earth Day lesson is retained and new entry is K–7',()=>{
  const pack=JSON.parse(readFileSync('content/master-inquiry-pack-v1.json','utf8'));
  assert.ok(pack.calendarProvocations.some(p=>p.id==='earth-day-systems'));
  assert.match(readFileSync('app/earth-month-entry.css','utf8'),/projector-on/);
  const entry=readFileSync('app/earth-month-entry.tsx','utf8');
  assert.match(entry,/K–2.*3–5.*6–7/);
  assert.doesNotMatch(entry,/9–12/);
});
