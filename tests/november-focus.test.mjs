import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const focus = await readFile(new URL("../app/november-child-day.tsx", import.meta.url), "utf8");
const rights = await readFile(new URL("../app/rights-strand.tsx", import.meta.url), "utf8");
const home = page.slice(page.indexOf('{view === "home" && ('), page.indexOf('{view === "rights" &&'));

test("the homepage features November instead of October date promotions", () => {
  assert.match(home, /<NovemberChildDay/);
  assert.doesNotMatch(home, /October|\bOct\.|2026-10|<CommunityToday|election-now|runways\.slice\(0, 3\)/i);
  assert.doesNotMatch(rights, /October foundations|October 21 launch/);
  assert.match(rights, /First student leadership meeting: Friday, November 13/);
});

test("November focus labels the optional pack and retains existing lesson routes", () => {
  assert.match(focus, /NOVEMBER FOCUS · NOVEMBER 20/);
  assert.match(focus, /National Child Day \/ World Children’s Day/);
  assert.match(focus, /The optional learning pack includes/);
  assert.match(focus, /not an official 2026 campaign theme or a scheduled school-wide event/);
  assert.match(focus, /not tagged or fillable/);
  assert.doesNotMatch(focus, /being prepared|coming soon/);
  for (const id of ["rights-in-our-room", "belonging-built", "concern-to-action"]) {
    assert.ok(focus.includes(`onLesson("${id}")`));
    assert.ok(page.includes(`id: "${id}"`));
  }
});

test("historical calendar and election learning remain available off the homepage", () => {
  assert.match(page, /const runways: Runway\[\]/);
  assert.match(page, /month: "OCT"/);
  assert.match(page, /<CommunityCalendar/);
  assert.match(page, /id: "voice-and-rules"/);
});
