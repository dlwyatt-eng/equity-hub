import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "pages-dist");
const html = await readFile(path.join(output, "index.html"), "utf8");
const files = await readdir(path.join(output, "assets"));

assert.match(html, /\/equity-hub\/assets\//, "The production bundle is missing the /equity-hub/ GitHub Pages base.");
assert.ok(files.some((file) => file.endsWith(".js")), "The Equity Hub artifact has no JavaScript bundle.");
assert.ok(files.some((file) => file.endsWith(".css")), "The Equity Hub artifact has no CSS bundle.");

const requiredPublicFiles = [
  "images/map-inquiry/mercator-world.svg",
  "images/map-inquiry/equal-earth-world.svg",
  "images/media-literacy-source-check.webp",
  "images/climate-justice-action.webp",
];
for (const file of requiredPublicFiles) await access(path.join(output, file));

const bundle = (await Promise.all(files.filter((file) => /\.(?:js|css)$/.test(file)).map((file) => readFile(path.join(output, "assets", file), "utf8")))).join("\n");
for (const file of requiredPublicFiles) {
  assert.match(bundle, new RegExp(`/equity-hub/${file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `The production bundle does not reference ${file}.`);
}

console.log(`Validated Equity Hub artifact with ${files.length} bundled assets and ${requiredPublicFiles.length} required inquiry visuals.`);
