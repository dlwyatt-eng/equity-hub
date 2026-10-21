import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const staff = await readFile(new URL("../app/school-staff-start.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/school-staff-start.css", import.meta.url), "utf8");

test("staff entry names the school contact and all requested areas", () => {
  for (const text of ["School contact: Daryl Wyatt", "Stewardship", "Social responsibility", "Outdoor education", "Student leadership &amp; Spirit Crew", "Social justice &amp; racial equity"]) assert.ok(staff.includes(text));
  assert.match(staff, /usual school channels/);
});

test("leadership uses the confirmed first date without other unverified details", () => {
  assert.match(staff, /First student leadership meeting: Friday, November 13/);
  assert.doesNotMatch(staff, /Nov(?:ember)?\.?\s*6|Room\s*112|every other Friday|mailto:|<form/);
  assert.match(staff, /not automatically a confirmed school event/);
});

test("staff entry reuses existing resources without replacing learning strands", () => {
  for (const id of ["belonging-built", "concern-to-action"]) {
    assert.ok(staff.includes(`onLesson("${id}")`));
    assert.ok(page.includes(`id: "${id}"`));
  }
  for (const target of ["nature", "outdoors", "rights", "action"]) assert.ok(staff.includes(`onNavigate("${target}")`));
  for (const component of ["<RightsEntry", "<EarthMonthEntry", "<CommunityCalendar", "<MapRepresentationInquiry"]) assert.ok(page.includes(component));
});

test("staff deep link supports focus, readable layouts and touch targets", () => {
  assert.match(staff, /id="school-staff"/);
  assert.match(staff, /aria-labelledby="school-staff-title"/);
  assert.match(staff, /id="school-staff-title" tabIndex=\{-1\}/);
  assert.match(page, /hashchange", openSchoolStaff/);
  assert.match(page, /getElementById\("school-staff-title"\)\?\.focus/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /@media \(max-width: 550px\)/);
  assert.match(css, /@media print/);
});
