import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { parseSegments } from "./lib.ts";

const signalsAndOutput = await readInputFor(
  "day8",
  splitByLines,
  parseSegments,
);

const outputs = signalsAndOutput.map((x) => x.outputDigits);

const digitsByLength = new Map([
  [2, 1],
  [4, 4],
  [3, 7],
  [7, 8],
]);

const occurences = new Map<number, number>();

for (const digits of outputs) {
  for (const stringDigit of digits) {
    const digit = digitsByLength.get(stringDigit.length);
    if (digit !== undefined) {
      const occurence = occurences.get(digit) || 0;
      occurences.set(digit, occurence + 1);
    }
  }
}

console.log(
  `part1: ${
    Array.from(occurences.values()).reduce((sum, val) => sum + val, 0)
  }`,
);
console.log(occurences);
