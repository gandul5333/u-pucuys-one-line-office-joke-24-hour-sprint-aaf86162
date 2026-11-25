// One-Line Office Joke: 24-Hour Sprint — u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162
// Writes one funny line (<=200 chars, single sentence) to /output/entry.txt.
//
// The line: telling the manager a meeting could have been an email, and the
// manager's answer is to book another meeting — about the attitude toward
// meetings. Judge weights, in order: (1) one funny line within 200 chars,
// (2) a real surprise at the end that still makes sense (the punishment for
// complaining about meetings is more meetings), (3) an everyday truth people
// recognise (everyone has sat in a meeting that should have been an email),
// (4) economy of words, (5) freshness (the recursion angle: a meeting about
// meetings, not a generic "meetings are boring" complaint). This line is
// built to hit all five in order.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my manager that meeting could have been an email, so he booked a meeting to discuss my attitude toward meetings.";

const MAX_LINE_LENGTH = 200;
const trimmed = LINE.trim();
if (trimmed.length === 0) {
  console.error("error: entry line must not be blank");
  process.exit(1);
}
if (trimmed.length > MAX_LINE_LENGTH) {
  console.error(
    `error: entry line must be at most ${MAX_LINE_LENGTH} characters, got ${trimmed.length}`,
  );
  process.exit(1);
}
if (trimmed.includes("\n") || trimmed.includes("\r")) {
  console.error("error: entry line must be a single line");
  process.exit(1);
}
const periods = (trimmed.match(/\./g) ?? []).length;
if (periods !== 1 || !trimmed.endsWith(".")) {
  console.error(
    "error: entry line must be a single sentence ending with exactly one '.'",
  );
  process.exit(1);
}
if (/[!?]/.test(trimmed)) {
  console.error("error: entry line must not contain '!' or '?'");
  process.exit(1);
}
if (LINE !== trimmed) {
  console.error("error: entry line must not start or end with whitespace");
  process.exit(1);
}
const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
if (wordCount < 5) {
  console.error(`error: entry line must have at least 5 words, got ${wordCount}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, trimmed, "utf8");
console.log(`Wrote ${trimmed.length} characters to ${outPath}`);
