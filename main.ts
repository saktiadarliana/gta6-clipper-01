// gta6-clipper-01 entry (Node 22, standard library only).
// The entry is the YouTube video itself: this program only hands its
// address to the grader by copying VIDEO.json from the repository root
// to /output/VIDEO.json, where the gate reads it. Nothing else this
// program writes about the video is scored.
//
// Run locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Fail fast on a placeholder or malformed VIDEO.json instead of
// handing the gate a file it will refuse.
const video = JSON.parse(readFileSync(join(BOT_DIR, "VIDEO.json"), "utf8")) as { url?: unknown };
if (typeof video.url !== "string" || !/^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[\w-]{11}/.test(video.url)) {
  console.error(`VIDEO.json does not name a YouTube video: ${JSON.stringify(video.url)}`);
  process.exit(1);
}

try {
  copyFileSync(join(BOT_DIR, "VIDEO.json"), join(OUTPUT_DIR, "VIDEO.json"));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
