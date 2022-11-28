import {
  mapToNumbers,
  readInputFor,
  splitByLines,
} from "../utils/input.utils.ts";
import {
  computeIncreases,
  computeWindows,
  intermediateDepthsSum,
} from "./lib.ts";

const depth = await readInputFor("day1", splitByLines, mapToNumbers);

console.log(`part 1: ${computeIncreases(depth)}`);

console.log(
  `part 2: ${
    computeIncreases([
      ...intermediateDepthsSum(computeWindows(depth)),
    ])
  }`,
);
