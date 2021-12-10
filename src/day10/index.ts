import { bench, runBenchmarks } from "../../deps.ts";
import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import {
  computeSyntaxErrorScore,
  computeMissingSequenceScores,
  getScore,
} from "./lib.ts";

const subsystems = await readInputFor("day10", splitByLines);

console.log(`part1: ${computeSyntaxErrorScore(subsystems)}`);
console.log(`part2: ${getScore(computeMissingSequenceScores(subsystems))}`);
