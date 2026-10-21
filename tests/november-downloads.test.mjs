import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const originals = {
  "Childrens-Day-2026-School-Learning-Pack.pdf": "2ab4712d8abcd50c08d6c2aacd7e476a0f0296530bbc0109c5e5605fa4835847",
  "Childrens-Day-2026-Rights-Poster.png": "d54dd72892c205aa77b1c84f6afab5ee1121be9b4fe9fa78ac71b8be0971fee7",
  "Childrens-Day-2026-School-Pack.zip": "8295576c60c7934a8204dde3c781518d1f6754e24aefc5daddf47eb3a3591b1a",
  "Childrens-Day-2026-Text-Companion.txt": "33ec195e1c57095c6f4a8f4e43b0b98862ba898bc876f05374d9ccefdeb302b5",
  "Read-me.txt": "a56527e8a10dd82566a65ce88cfe1e75bb96b53112d28404d01dd365b9104098",
};
const focus = await readFile(new URL("../app/november-child-day.tsx", import.meta.url), "utf8");

test("every November download exists and preserves the reviewed original bytes", async () => {
  for (const [filename, expected] of Object.entries(originals)) {
    const bytes = await readFile(new URL(`../public/downloads/childrens-day-2026/${filename}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, filename);
    assert.ok(focus.includes(`/downloads/childrens-day-2026/${filename}`), `Missing download link: ${filename}`);
    const built = await readFile(new URL(`../pages-dist/downloads/childrens-day-2026/${filename}`, import.meta.url));
    assert.deepEqual(built, bytes, `Published artifact changes ${filename}`);
  }
});

test("text companion preserves source credits and the original-theme limitation", async () => {
  const text = await readFile(new URL("../public/downloads/childrens-day-2026/Childrens-Day-2026-Text-Companion.txt", import.meta.url), "utf8");
  for (const source of ["canada.ca", "unicef.org", "curriculum.gov.bc.ca"]) assert.ok(text.includes(source));
  assert.match(text, /not an official 2026 campaign theme/);
});
