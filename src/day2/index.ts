import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { parseSubmarineMoves, sumMoves, sumMovesUsingAim } from "./lib.ts";

const content = await readInputFor("day2", splitByLines);
const moves = content.map(parseSubmarineMoves);
const position = sumMoves(moves);
const positionPart2 = sumMovesUsingAim(moves);

console.log(`part1: ${position.x * position.y}`);
console.log(`part2: ${positionPart2.x * positionPart2.y}`);
