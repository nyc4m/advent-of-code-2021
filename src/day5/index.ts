import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import {
  filterLinesForPart1,
  findNumberOfCrossings,
  parseLines,
} from "./lib.ts";

const {diagonalLess, lines} = await readInputFor(
  "day5",
  splitByLines,
  parseLines,
  lines => {
    return {
      diagonalLess: filterLinesForPart1(lines),
      lines
    }
  }
);

const wrongAnswers = [9413, 18565, 5992];

const crossingsWithoutDiagonals = findNumberOfCrossings(diagonalLess);
const crossings = findNumberOfCrossings(lines)

//Correct answer 5835
console.log(
  `part1: ${crossingsWithoutDiagonals} ${wrongAnswers.includes(crossingsWithoutDiagonals) ? "❌" : "✅"}`,
);

console.log(`part2: ${crossings}`)
