import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import {
  parseLines,
  filterLinesForPart1,
  computeAllPossibleCrossing,
} from "./lib.ts";

const lines = await readInputFor(
  "day5",
  splitByLines,
  parseLines,
  filterLinesForPart1
);

const wrongAnswers = [9413, 18565];

const answer = computeAllPossibleCrossing(lines);

console.log(`part1: ${answer} ${wrongAnswers.includes(answer) ? "❌" : "✅"}`);
