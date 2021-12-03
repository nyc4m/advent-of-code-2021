import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import {
  createBinary,
  computeRate,
  mostFrequent,
  leastFrequent,
  computingGazRating,
} from "./lib.ts";

const content = await readInputFor("day3", splitByLines);
const binaryDigits = content.map(createBinary);

console.log(
  `part1: ${
    computeRate(binaryDigits, mostFrequent) *
    computeRate(binaryDigits, leastFrequent)
  }`
);

const o2 = computingGazRating(binaryDigits, mostFrequent);
const co2 = computingGazRating(binaryDigits, leastFrequent);
console.table({ o2, co2 });
console.log(`part2: ${o2 * co2}`);
