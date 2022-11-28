import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { Collections } from "../../deps.ts";
import { executeFold, parseFold, parsePoint } from "./lib.ts";

const { points, folds } = await readInputFor(
  "day13",
  splitByLines,
  (lines) => ({
    points: Collections.takeWhile(lines, (l) => l !== ""),
    folds: Collections.takeLastWhile(lines, (line) => line !== ""),
  }),
  (input) => {
    return {
      points: input.points.map(parsePoint),
      folds: input.folds.map(parseFold),
    };
  },
);

console.log(`before folding there are ${points.length} points`);
console.log(`part1: ${executeFold(points, folds[0]).length}`);

const state = [points];

for (const fold of folds) {
  state.push(executeFold(state[state.length - 1], fold));
}

const lastIteration = state[state.length - 1];
const maxX = Math.max(...lastIteration.map((i) => i.x));
const maxY = Math.max(...lastIteration.map((i) => i.y));

const screen: " " | "#"[][] = Array(maxY + 1)
  .fill(0)
  .map((_) => Array(maxX + 1).fill(" "));
for (const { x, y } of lastIteration) {
  screen[y][x] = "#";
}

for (const line of screen) {
  let render = "";
  for (const pixel of line) {
    render += pixel;
  }
  console.log(render);
}
