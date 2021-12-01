import { readInputFor } from "../utils/readInput.ts";
import {
  computeIncreases,
  computeWindows,
  intermediateDepthsSum,
} from "./lib.ts";

const inputContent = await readInputFor("day1");

console.log(
  `part 1: ${computeIncreases(inputContent.split("\n").map(Number))}`
);

console.log(
  `part 2: ${computeIncreases([
    ...intermediateDepthsSum(
      computeWindows(inputContent.split("\n").map(Number))
    ),
  ])}`
);
