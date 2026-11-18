// Entry for make.fun competition news-image-20261117.
// The repository ships one finished image (entry.png, a one-page broadsheet
// summing up the world news of Tuesday 17 November 2026: the Crimea bridge
// strike, the Kemerovo plane crash, the US losing measles elimination status,
// Japan scrambling jets, the Gaza aid appeal, the Depardieu admission, the
// Houthi advance in Yemen, the Hormuz tanker mining and drone seizure, the
// Zaporizhzhia strikes, and the COP31 draft deal, plus a map of the stories
// and an "Also on" column). The harness runs this program with no network
// and expects exactly one file afterwards: entry.png inside the output
// directory. So the whole program is a faithful byte-for-byte copy of the
// shipped asset to that destination.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, dest);

// A truncated or partial copy would silently produce an invalid entry, so
// verify the destination holds exactly as many bytes as the source.
const srcSize = statSync(source).size;
const dstSize = statSync(dest).size;
if (dstSize !== srcSize) {
  throw new Error(`copy size mismatch: source ${srcSize} bytes, wrote ${dstSize} bytes`);
}

console.log(`wrote ${dest} (${dstSize} bytes)`);
