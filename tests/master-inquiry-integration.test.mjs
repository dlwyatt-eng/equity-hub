import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const pack = JSON.parse(await readFile(path.join(root, "content/master-inquiry-pack-v1.json"), "utf8"));
const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
const panels = await readFile(path.join(root, "app/master-inquiry-panels.tsx"), "utf8");

test("the canonical inquiry pack is integrated as the single content source", () => {
  assert.equal(pack.contentVersion, "2026-master-inquiry-pack-v1");
  assert.match(panels, /master-inquiry-pack-v1\.json/);
  assert.match(page, /MapRepresentationInquiry/);
  assert.match(page, /CalendarProvocationsPanel/);
  assert.doesNotMatch(panels, /teacher-hub|learn\//i);
});

test("map representation inquiry carries the required evidence route", async () => {
  assert.equal(pack.mapInquiry.publicTitle, "Who Gets to Represent the World?");
  assert.deepEqual(pack.mapInquiry.projectionCards.map((item) => item.name), ["Mercator", "Equal Earth"]);
  assert.equal(pack.mapInquiry.comparisons.length, 4);
  assert.match(pack.mapInquiry.timeSensitiveNote, /official resolution or meeting record/i);
  for (const stage of ["NOTICE", "WONDER", "INVESTIGATE", "EVIDENCE", "POWER", "REIMAGINE"]) assert.match(panels, new RegExp(`label: "${stage}"`));
  for (const relative of ["public/images/map-inquiry/mercator-world.svg", "public/images/map-inquiry/equal-earth-world.svg"]) await access(path.join(root, relative));
});

test("all seven calendar provocations are complete and discoverable", () => {
  const expectedIds = [
    "terry-fox-access-and-action",
    "harvest-reciprocity",
    "remembrance-public-memory",
    "truth-records-responsibility",
    "black-futures-bc",
    "earth-day-systems",
    "pink-shirt-bystander-power",
  ];
  assert.deepEqual(pack.calendarProvocations.map((item) => item.id), expectedIds);
  const harvest = pack.calendarProvocations.find((item) => item.id === "harvest-reciprocity");
  assert.deepEqual(harvest.source, {
    label: "Working Group on Indigenous Food Sovereignty",
    href: "https://wgifs.org/",
  });
  for (const provocation of pack.calendarProvocations) {
    for (const key of ["title", "lens", "timing", "learning", "hook", "before", "discussion", "product", "differentiation", "fallback", "antiTokenism"]) {
      assert.ok(provocation[key]?.trim(), `${provocation.id} is missing ${key}`);
    }
    assert.ok(provocation.noticeWonder.length >= 2, `${provocation.id} needs Notice/Wonder prompts`);
    assert.ok(provocation.questions.length >= 3, `${provocation.id} needs accessible inquiry questions`);
    assert.ok(provocation.curriculum.length >= 3, `${provocation.id} needs curriculum connections`);
    assert.ok(provocation.source?.href.startsWith("https://"), `${provocation.id} needs a direct public source`);
    assert.match(page, new RegExp(provocation.id));
  }
  for (const band of ["K–2", "3–5", "6–8", "9–12"]) assert.match(panels, new RegExp(band));
});

test("previously unused evidence and climate visuals are now purposeful", () => {
  assert.match(panels, /media-literacy-source-check\.webp/);
  assert.match(panels, /climate-justice-action\.webp/);
});

test("the evidence protocol names uncertainty without creating false balance", () => {
  assert.equal(pack.evidenceProtocol.steps.length, 6);
  const kinds = pack.evidenceProtocol.uncertaintyLadder.map((item) => item.kind);
  for (const kind of ["Honest question", "Incomplete evidence", "Competing interpretation", "Outdated information or mistake", "Strategic doubt", "Misinformation", "Denialism"]) assert.ok(kinds.includes(kind));
  assert.match(panels, /EvidenceProtocolPanel/);
  assert.match(pack.evidenceProtocol.uncertaintyLadder.at(-1).teacherMove, /documented harms, identities, or basic rights/i);
});
