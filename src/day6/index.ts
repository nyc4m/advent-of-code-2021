import { mapToNumbers, readInputFor } from "../utils/input.utils.ts";
import { simulateDays } from "./lib.ts";

const fishes = await readInputFor(
  "day6",
  (input) => input.split(","),
  mapToNumbers
);

console.log(`part1: ${simulateDays(80, fishes)}`);
console.log(`part1: ${simulateDays(256, fishes)}`);
