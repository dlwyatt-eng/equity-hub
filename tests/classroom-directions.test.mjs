import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const page=await readFile(new URL('../app/page.tsx',import.meta.url),'utf8');
const component=await readFile(new URL('../app/classroom-directions.tsx',import.meta.url),'utf8');
const css=await readFile(new URL('../app/classroom-directions.css',import.meta.url),'utf8');
const printable=await readFile(new URL('../public/printables/notice-evidence-next-step.html',import.meta.url),'utf8');
test('classroom pacing starts with all instructions and resets per screen',()=>{assert.match(component,/useState\(directions.length\)/);assert.match(page,/key=\{`\$\{selectedLesson.id\}-\$\{stepIndex\}`\}/);assert.match(component,/Math.min\(directions.length, visible \+ 1\)/)});
test('hidden paced directions are restored when printing',()=>{assert.match(css,/@media print[\s\S]*li\[hidden\].*display:flex/);assert.match(component,/aria-live="polite"/)});
test('quick launch preserves preparation and avoids mandatory extra work',()=>{assert.match(page,/First use\? Check the route, preparation and care guidance below/);assert.match(page,/does not replace the route’s activity pages/);assert.match(printable,/not additional homework/)});
test('optional organizer supports alternative responses and privacy',()=>{assert.match(printable,/Draw, write, point or tell a partner/);assert.match(printable,/fictional example and pass on personal sharing/);assert.match(printable,/does not save responses/)});
test('provocation scroll respects reduced motion',()=>{assert.match(page,/matchMedia\("\(prefers-reduced-motion: reduce\)"\).matches \? "auto" : "smooth"/)});

test("final reveal restores focus to the persistent pacing toggle",()=>{assert.match(component,/ref=\{toggleRef\}/);assert.match(component,/if \(next === directions.length\) toggleRef.current\?\.focus\(\)/)});

test("quick launch selects dedicated BC inquiry worksheet when that route is chosen",()=>{const quick=page.slice(page.indexOf('className="classroom-quick-start"'),page.indexOf('className="overview-facts"'));assert.match(quick,/selectedRoute\?\.title === "B.C. provincial party inquiry" \? "\/downloads\/bc-provincial-party-inquiry-black-white.pdf" : selectedLesson.printable.bwHref/)});

test("projection exit stays visible without hover and compact projectors retain readable text",async()=>{const global=await readFile(new URL("../app/globals.css",import.meta.url),"utf8");assert.match(global,/\.projector-on \.project-button \{ opacity: 1; color: #173b36; background: #fff/);assert.match(global,/max-height: 800px/);assert.match(global,/projector-on:not\(\.large-text\)/)});
