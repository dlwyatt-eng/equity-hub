import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const componentPath = path.join(root, "app/master-inquiry-panels.tsx");
const source = await readFile(componentPath, "utf8");
const css = await readFile(path.join(root, "app/master-inquiry-panels.css"), "utf8");
const pack = JSON.parse(await readFile(path.join(root, "content/master-inquiry-pack-v1.json"), "utf8"));
const authentic = pack.calendarProvocations.find(({ id }) => id === "truth-records-responsibility");
const rehearsal = authentic.listeningRehearsal;
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  fileName: componentPath,
}).outputText;

function loadComponent(react = React) {
  const localRequire = createRequire(componentPath);
  const module = { exports: {} };
  const require = (specifier) => specifier === "react" ? react : specifier.endsWith(".css") ? {} : localRequire(specifier);
  new Function("require", "module", "exports", compiled)(require, module, module.exports);
  return module.exports;
}

function escaped(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
}

function findElement(tree, predicate) {
  if (Array.isArray(tree)) return tree.map((child) => findElement(child, predicate)).find(Boolean);
  if (!React.isValidElement(tree)) return undefined;
  return predicate(tree) ? tree : findElement(tree.props.children, predicate);
}

// Exercise the parent route's hook state and callbacks without a browser or new dependencies.
function routeHarness() {
  const state = [];
  const dependencies = [];
  let cursor = 0;
  let effects = [];
  const component = loadComponent({
    ...React,
    useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
      return [state[index], (next) => { state[index] = typeof next === "function" ? next(state[index]) : next; }];
    },
    useMemo(compute) { cursor++; return compute(); },
    useEffect(effect, nextDependencies) {
      const index = cursor++;
      if (!dependencies[index] || nextDependencies.some((value, position) => value !== dependencies[index][position])) effects.push(effect);
      dependencies[index] = nextDependencies;
    },
  });
  return {
    ...component,
    render(projectorMode = false) {
      cursor = 0;
      effects = [];
      const result = component.CalendarProvocationsPanel({ projectorMode, onEnterProjection: async () => {}, onExitProjection: async () => {} });
      effects.forEach((effect) => effect());
      return result;
    },
  };
}

test("the fictional source is complete, narrowly scoped, and does not overstate the notice", () => {
  assert.deepEqual(pack.calendarProvocations.filter((item) => item.listeningRehearsal).map(({ id }) => id), [authentic.id]);
  for (const key of ["id", "title", "goal", "attribution", "boundary", "teacherNote", "returnToAuthentic"]) assert.ok(rehearsal[key]?.trim(), key);
  assert.equal(rehearsal.sourceCards.length, 2);
  for (const card of rehearsal.sourceCards) for (const key of ["id", "title", "context", "text"]) assert.ok(card[key]?.trim(), key);
  assert.match(rehearsal.attribution, /Classroom OS.*fictional/);
  assert.match(rehearsal.boundary, /not survivor testimony, Indigenous knowledge, historical evidence, or an analogy for residential schools/);
  assert.match(rehearsal.teacherNote, /does not prove the meeting happened or everyone received the message/);
  assert.match(rehearsal.returnToAuthentic, /never attribute this fictional rehearsal to NCTR or a Nation/);
  assert.ok(rehearsal.prompts.length >= 3);
  assert.ok(rehearsal.finishFrame.length >= 4);
});

test("the standalone card renders the actual sources, full response, and its own attribution", () => {
  const { FictionalListeningRehearsal } = loadComponent();
  const html = renderToStaticMarkup(React.createElement(FictionalListeningRehearsal, { rehearsal, onBack() {} }));
  const fields = [rehearsal.title, rehearsal.goal, rehearsal.attribution, rehearsal.boundary, rehearsal.teacherNote, rehearsal.returnToAuthentic, ...rehearsal.prompts, ...rehearsal.finishFrame];
  for (const card of rehearsal.sourceCards) fields.push(card.title, card.context, card.text);
  for (const value of fields) assert.ok(html.includes(escaped(value)), `Missing visible rehearsal field: ${value}`);
  for (const value of [authentic.title, authentic.lens, authentic.learning, authentic.hook, authentic.discussion, authentic.product, authentic.source.label, authentic.source.href]) {
    assert.ok(!html.includes(escaped(value)), `Authentic lesson leaked into fictional practice: ${value}`);
  }
  assert.equal((html.match(/FICTIONAL SOURCE · CLASSROOM OS/g) ?? []).length, 2);
  assert.match(html, /Back to calendar/);
  assert.match(html, /Print fictional listening rehearsal/);
  assert.doesNotMatch(html, /<details|<a\b|Project 3 screens/);
});

test("rehearsal opens only by an explicit action and replaces the authentic calendar content", () => {
  const route = routeHarness();
  const inventory = route.render();
  const open = findElement(inventory, (element) => element.props.id === `listening-rehearsal-open-${authentic.id}`);
  assert.equal(open.props.children, "Open fictional listening rehearsal");
  assert.notEqual(inventory.type, route.FictionalListeningRehearsal);
  open.props.onClick();
  const selected = route.render();
  assert.equal(selected.type, route.FictionalListeningRehearsal);
  assert.deepEqual(selected.props.rehearsal, rehearsal);
  assert.equal(selected.props.provocation, undefined);
});

test("authentic projection clears rehearsal state and starts at its first screen", () => {
  const route = routeHarness();
  const inventory = route.render();
  findElement(inventory, (element) => element.props.id === `listening-rehearsal-open-${authentic.id}`).props.onClick();
  assert.equal(route.render().type, route.FictionalListeningRehearsal);
  const projection = route.render(true);
  assert.equal(projection.props.provocation.id, authentic.id);
  assert.equal(projection.props.screen, 0);
  assert.notEqual(route.render(false).type, route.FictionalListeningRehearsal);
  assert.notEqual(routeHarness().render().type, route.FictionalListeningRehearsal, "A new route mount must not retain a prior rehearsal.");
  assert.match(source, /const begin = \(provocation: CalendarProvocation\) => \{\s*setRehearsal\(null\)/);
});

test("Back returns to the calendar and requests focus on the original launch button", () => {
  const route = routeHarness();
  const inventory = route.render();
  findElement(inventory, (element) => element.props.id === `listening-rehearsal-open-${authentic.id}`).props.onClick();
  const selected = route.render();
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  let focusedId;
  try {
    Object.defineProperty(globalThis, "window", { configurable: true, value: { requestAnimationFrame(callback) { callback(); } } });
    Object.defineProperty(globalThis, "document", { configurable: true, value: { getElementById(id) { return { focus() { focusedId = id; } }; } } });
    selected.props.onBack();
    assert.notEqual(route.render().type, route.FictionalListeningRehearsal);
    assert.equal(focusedId, `listening-rehearsal-open-${authentic.id}`);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow); else delete globalThis.window;
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument); else delete globalThis.document;
  }
});

test("focus, announcement, responsive reading, and complete print content have explicit support", () => {
  assert.match(source, /headingRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /document\.title = `\$\{rehearsal\.title\}/);
  assert.match(source, /role="status" aria-live="polite"/);
  assert.match(source, /window\.requestAnimationFrame\(\(\) => document\.getElementById\(returnId\)\?\.focus\(\)\)/);
  assert.match(css, /fictional-listening-actions button:focus-visible/);
  assert.match(css, /\.fictional-listening-sources \{ grid-template-columns: 1fr; \}/);
  const print = css.slice(css.indexOf("@media print"));
  assert.match(print, /\.fictional-listening-entry button, \.fictional-listening-actions \{ display: none !important; \}/);
  assert.match(print, /\.planning-page:has\(> \.fictional-listening-rehearsal\) > :not\(\.fictional-listening-rehearsal\)/);
  assert.match(print, /\.fictional-listening-sources \{ display: block; \}/);
  assert.match(print, /fictional-listening-care[\s\S]*break-inside: avoid/);
});
