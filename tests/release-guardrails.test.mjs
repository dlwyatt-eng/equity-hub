import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
const css = await readFile(path.join(root, "app/globals.css"), "utf8");
const masterCss = await readFile(path.join(root, "app/master-inquiry-panels.css"), "utf8");
const workflow = await readFile(path.join(root, ".github/workflows/pages.yml"), "utf8");

test("keyboard users can skip the repeated site navigation", () => {
  assert.match(page, /className="skip-link" href="#main-content"/);
  assert.match(page, /id="main-content" tabIndex=\{-1\}/);
  assert.match(css, /\.skip-link:focus\s*\{\s*transform:\s*translateY\(0\)/);
});

test("CSS projection can always exit when Fullscreen API is blocked", () => {
  assert.match(page, /const enterProjection = async/);
  assert.match(page, /setProjectorMode\(true\)/);
  assert.match(page, /const exitProjection = async/);
  assert.match(page, /finally\s*\{\s*setProjectorMode\(false\)/);
  assert.match(page, /if \(projectorMode \|\| document\.fullscreenElement\) await exitProjection\(\)/);
});

test("browser print removes interactive chrome and normalizes large text", () => {
  assert.match(css, /@page\s*\{\s*size:\s*letter portrait/);
  assert.match(css, /html\.large-type-root/);
  assert.match(css, /\.player-print-actions/);
  assert.match(css, /\.step-track/);
  assert.match(css, /\.teacher-dock/);
  assert.match(masterCss, /@media print/);
  assert.match(masterCss, /break-inside:\s*avoid/);
});

test("Pages deployment runs the complete repository gate", () => {
  assert.match(workflow, /- run: npm test/);
  assert.match(workflow, /- run: git diff --check/);
  assert.doesNotMatch(workflow, /- run: npx vite build/);
});
