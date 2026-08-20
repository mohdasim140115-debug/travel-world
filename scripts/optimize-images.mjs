/* =========================================================
   ONE-TIME: shrink the source photos in public/
   The originals are 2-7 MB Unsplash downloads at print
   resolution. Nothing on the site renders wider than the
   viewport, so they are capped at 1920px and re-encoded
   with mozjpeg. next/image still resizes per device on top
   of this — this just stops the build and the optimizer
   from carrying 200 MB around.

   Originals stay recoverable from git history.

   Usage: node scripts/optimize-images.mjs [--dry]
========================================================= */

import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public";
const MAX_WIDTH = 1920;
const QUALITY = 78;
const DRY = process.argv.includes("--dry");

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;
let skipped = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const originalSize = (await stat(full)).size;
  before += originalSize;

  const image = sharp(full, { failOn: "none" });
  const meta = await image.metadata();
  const isJpeg = /\.jpe?g$/i.test(file);

  if (meta.width <= MAX_WIDTH && originalSize < 400 * 1024) {
    after += originalSize;
    skipped += 1;
    continue;
  }

  if (DRY) {
    console.log(`would shrink ${file} (${meta.width}px, ${Math.round(originalSize / 1024)}KB)`);
    continue;
  }

  const tmp = path.join(DIR, `.tmp-${file}`);
  const pipeline = image.resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true });

  await (isJpeg
    ? pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    : pipeline.png({ compressionLevel: 9, palette: true })
  ).toFile(tmp);

  const newSize = (await stat(tmp)).size;

  // Never replace a file with a bigger one.
  if (newSize >= originalSize) {
    await unlink(tmp);
    after += originalSize;
    skipped += 1;
    continue;
  }

  await rename(tmp, full);
  after += newSize;
  console.log(
    `  ${file.padEnd(52)} ${String(Math.round(originalSize / 1024)).padStart(6)}KB -> ${String(
      Math.round(newSize / 1024)
    ).padStart(5)}KB`
  );
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(
  `\n${files.length} files (${skipped} left alone): ${mb(before)} MB -> ${mb(after)} MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
);
