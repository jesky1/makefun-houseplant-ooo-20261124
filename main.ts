// Entry for make.fun's "The Houseplant Out-of-Office".
//
// The whole program is one job: put a single out-of-office auto-reply,
// written as if a houseplant sent it, into entry.txt inside the output
// directory, byte for byte the same on every run. The grader points
// MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain
// machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the
// entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The reply itself, in a houseplant's voice: the plant did the one
// useful thing it can do with an email — turned it into oxygen — and
// will only be back once someone finally waters it.
const REPLY =
  "Out of office: I photosynthesized your email into oxygen. You are welcome. Back when someone waters me.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("The Houseplant Out-of-Office"): the entry must
// be a single line of at most 120 characters. Enforced here so a bad
// edit fails loudly instead of silently producing an entry the judge
// rejects.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 120;

function validateLine(line) {
  if (line.length < MIN_LINE_LENGTH || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `Line must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Line must be a single line (no newline characters).');
  }
  // The gate rejects whitespace-only text, so fail loudly here too.
  if (line.trim().length === 0) {
    throw new Error('Line must not be only whitespace.');
  }
  // No leading or trailing spaces: the judge reads the file exactly,
  // so stray padding would be part of the entry.
  if (line !== line.trim()) {
    throw new Error('Line must not start or end with whitespace.');
  }
}

validateLine(REPLY);

writeFileSync(join(outputDir, 'entry.txt'), REPLY, 'utf8');
