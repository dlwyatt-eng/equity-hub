import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
const css = await readFile(path.join(root, "app/globals.css"), "utf8");

test("SPA routes transfer focus and announce their destination", () => {
  assert.match(page, /shellRef/);
  assert.match(page, /querySelector<HTMLElement>\("h1"\)/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /className="sr-only"/);
});

test("navigation, filters, and lesson progress expose selection state", () => {
  assert.match(page, /aria-current=/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /aria-current=\{index === stepIndex \? "step" : undefined\}/);
});

test("Orange Shirt Day and the school observance are not conflated", () => {
  assert.match(page, /September 29 school observance/);
  assert.match(page, /September 30/);
  assert.match(page, /National Day for Truth and Reconciliation/);
});

test("focus and screen-reader utility styles remain present", () => {
  assert.match(css, /\.sr-only/);
  assert.match(css, /outline:\s*3px solid #fff/);
  assert.match(css, /box-shadow:\s*0 0 0 7px #0b6074/);
  assert.doesNotMatch(css, /#61736d/i);
});
