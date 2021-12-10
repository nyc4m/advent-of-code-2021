import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { computeRisk, findLowestPoints } from "./lib.ts";

const heightMap = await readInputFor("day9", splitByLines, (lines) =>
  lines.map((line) => line.split("").map(Number))
);

console.log(`part1: ${findLowestPoints(heightMap, computeRisk())}`);
