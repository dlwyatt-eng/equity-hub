import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const root = path.resolve(import.meta.dirname, "..");
const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
const css = await readFile(path.join(root, "app/lesson-finder.css"), "utf8");
const moduleURL = source => "data:text/javascript;base64," + Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText).toString("base64");
const discoveryURL = moduleURL(await readFile(path.join(root, "app/lesson-discovery.ts"), "utf8"));
const { discoverLessons, routesFor, timeFits, routeContext, routePurposes, subjectsFor, purposes, times } = await import(discoveryURL);
// Evaluate only the repository's literal lesson data, so changes to the real routes exercise the filter.
const data = page.slice(page.indexOf("const lessons: Lesson[]"), page.indexOf("const runways:"));
const { lessons } = await import(moduleURL(data.replace("const lessons:", "export const lessons:")));
const defaults = { grade: "ALL", time: "all", purpose: "all", subject: "all" };
const require = createRequire(import.meta.url);
let finder = await readFile(path.join(root, "app/lesson-finder.tsx"), "utf8");
finder = finder.replace('import "./lesson-finder.css";', '').replaceAll('"./lesson-discovery"', JSON.stringify(discoveryURL));
let finderJS = ts.transpileModule(finder, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
finderJS = finderJS.replaceAll('"react/jsx-runtime"', JSON.stringify(pathToFileURL(require.resolve("react/jsx-runtime")).href));
const { default: Finder } = await import("data:text/javascript;base64," + Buffer.from(finderJS).toString("base64"));
function markup(selection = {}, grade = "ALL") {
  return renderToStaticMarkup(React.createElement(Finder, { lessons, grade, selection: { time: "all", purpose: "all", subject: "all", showAll: false, ...selection }, onSelection() {}, onGrade() {}, onPrepare() {}, onQuestions() {} }));
}
test("all ten original lesson packs remain discoverable without filters", () => {
  assert.equal(lessons.length, 10);
  assert.deepEqual(discoverLessons(lessons, defaults).map(v => v.lesson.id), lessons.map(v => v.id));
});
test("time filter uses upper range and never treats multi-session time as a short lesson", () => {
  for (const label of ["7–12 min", "15 min"]) assert.equal(timeFits(label, "15"), true);
  for (const label of ["15–25 min", "20–30 min", "35–45 min", "2 × 40 min", "2–3 blocks", "Project session + 10-min check", "3–6 lessons + project", "Unknown"]) assert.equal(timeFits(label, "15"), false, label);
  assert.equal(timeFits("20–30 min", "30"), true);
  assert.equal(timeFits("45–65 min", "60"), false);
  assert.equal(timeFits("2 × 40 min", "sequence"), true);
  assert.equal(timeFits("45–55 min", "sequence"), false);
});
test("every real route has purpose metadata and valid unique screen indices", () => {
  for (const lesson of lessons) for (const route of routesFor(lesson)) {
    if (lesson.routes) assert.ok(routePurposes[route.title]?.length, route.title);
    assert.ok(route.steps.length, route.title);
    assert.equal(new Set(route.steps).size, route.steps.length);
    route.steps.forEach(i => assert.ok(lesson.steps[i], `${lesson.id}: ${i}`));
  }
});
test("a short reflection cannot masquerade as a design lesson", () => {
  assert.equal(discoverLessons(lessons, { ...defaults, time: "15", purpose: "design" }).length, 0);
  const reflection = discoverLessons(lessons, { ...defaults, time: "15", purpose: "reflect" });
  assert.ok(reflection.some(v => v.lesson.id === "belonging-built"));
  assert.equal(reflection.find(v => v.lesson.id === "belonging-built").routes[0].title, "Belonging check-back");
});
test("subject filtering uses explicit whole-lesson connections, not a conditional science claim", () => {
  assert.equal(subjectsFor(lessons.find(v => v.id === "animal-welfare")).includes("Science"), false);
  const result = discoverLessons(lessons, { ...defaults, subject: "ADST" });
  assert.ok(result.length > 0);
  result.forEach(({ lesson }) => assert.ok(lesson.teacher.curriculum.some(v => v.startsWith("ADST:"))));
});
test("grade sorts close fits first but preserves adaptations", () => {
  const result = discoverLessons(lessons, { ...defaults, grade: "K–2" });
  assert.equal(result.length, 10);
  assert.equal(result[0].lesson.id, "belonging-built");
  assert.ok(result.some(v => v.lesson.teacher.adaptations.find(a => a.band === "K–2")?.fit === "Teacher-led"));
});
test("every filter combination returns only original matching routes", () => {
  for (const grade of ["ALL", "K–2", "3–5", "6–7"]) for (const time of times) for (const purpose of purposes) {
    const result = discoverLessons(lessons, { ...defaults, grade, time: time.value, purpose: purpose.value });
    for (const match of result) for (const route of match.routes) {
      assert.ok(routesFor(match.lesson).some(v => v.title === route.title));
      assert.ok(timeFits(route.time, time.value));
    }
  }
});
test("prerequisites are explicit on short revisit, extension and approved action routes", () => {
  assert.match(routeContext({ title: "Belonging check-back" }), /already started/);
  assert.match(routeContext({ title: "AI privacy extension" }), /earlier/);
  assert.match(routeContext({ title: "Approved action + follow-up" }), /approval/);
});
test("default shows three cards with an explicit route to the full collection", () => {
  const html = markup();
  assert.equal((html.match(/class="discovery-card tone-/g) || []).length, 3);
  assert.match(html, /Show all 10 matches/);
  assert.match(html, /aria-controls="discovery-results"/);
  assert.match(html, /role="status" aria-live="polite"/);
  assert.equal((html.match(/<label>/g) || []).length, 4);
  assert.equal((html.match(/<select>/g) || []).length, 4);
  assert.match(html, /Subject connections describe the whole lesson/);
});
test("all and empty results render clearly with reset; full print links remain real", () => {
  const all = markup({ showAll: true });
  assert.equal((all.match(/class="discovery-card tone-/g) || []).length, 10);
  const empty = markup({ time: "15", purpose: "design" });
  assert.match(empty, /No route fits all those choices/);
  assert.match(empty, /Reset and browse lessons/);
  lessons.forEach(lesson => [lesson.image, lesson.printable.href, lesson.printable.bwHref].forEach(href => assert.ok(existsSync(path.join(root, "public", href)), href)));
});
test("filter state survives preparation and the exact selected steps reach the overview", () => {
  assert.match(page, /useState<FinderSelection>/);
  assert.match(page, /selection=\{finderSelection\} onSelection=\{setFinderSelection\}/);
  assert.match(page, /onPrepare=\{\(id, steps\) => \{ startLesson\(id\); chooseRoute\(steps\); \}\}/);
  assert.match(page, /window.location.hash === "#lessons"/);
});
test("preparation comes from selected route and keeps care, source and curriculum guidance", () => {
  assert.match(page, /Ready in a few clear steps/);
  assert.match(page, /selectedRoute\?\.print \?\? selectedLesson.printable.pagePlan.join/);
  assert.match(page, /activeStepIndexes.map\(index => <li/);
  assert.match(page, /selectedLesson.teacher.care/);
  assert.match(page, /selectedLesson.teacher.sources/);
});
test("responsive and print layouts support large text and avoid clipped preparation", () => {
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /\.large-text \.discovery-filter-grid/);
  assert.match(css, /@media print/);
  assert.match(css, /overflow: visible/);
  assert.match(css, /\.route-ready-grid > div \{ break-inside: avoid/);
});
