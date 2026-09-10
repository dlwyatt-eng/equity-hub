import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {localDay,activeCards} from '../content/community-dates.mjs';
const calendar=JSON.parse(readFileSync(new URL('../content/community-calendar-2026-27.json',import.meta.url)));
test('Surrey date uses its time-zone database across seasons',()=>{
 assert.equal(localDay(new Date('2026-09-30T06:59:00Z')),'2026-09-29');
 assert.equal(localDay(new Date('2026-09-30T07:00:00Z')),'2026-09-30');
 assert.equal(localDay(new Date('2027-01-01T06:59:00Z')),'2026-12-31');
});
test('no invented daily event, stale annual repeat, or month boundary leak',()=>{
 assert.equal(activeCards(calendar,'2026-09-08').length,0);
 assert.equal(activeCards(calendar,'2027-09-30').length,0);
 assert.equal(activeCards(calendar,'2026-10-31').some(c=>c.id==='islamic-history'),true);
 assert.equal(activeCards(calendar,'2026-11-01').some(c=>c.id==='islamic-history'),false);
 assert.equal(activeCards(calendar,'2027-06-05').some(c=>c.id==='accessability'),true);
 assert.equal(activeCards(calendar,'2027-06-06').some(c=>c.id==='accessability'),false);
});
test('all cards have valid reviewed dates, sources, grade choices and real Hub lesson destinations',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 assert.equal(new Set(calendar.items.map(c=>c.id)).size,calendar.items.length);
 for(const c of calendar.items){
  for(const d of [c.start,c.end])assert.equal(new Date(d).toISOString().slice(0,10),d,c.id);
  assert.ok(c.start<=c.end&&c.start>=calendar.validFrom&&c.end<=calendar.validUntil,c.id);
  assert.equal(c.deeper.length,3);assert.ok(page.includes(`id: "${c.lesson}"`),c.id);
  for(const k of [...c.voices,c.dateSource])assert.ok(calendar.sources[k]?.href.startsWith('https://'),c.id);
 }
 for(const id of ['ramadan','eid-fitr','eid-adha']) assert.match(calendar.items.find(c=>c.id===id).dateNote,/Anticipated/);
 assert.equal(calendar.items.find(c=>c.id==='holocaust').minBand,'6–7');
});
