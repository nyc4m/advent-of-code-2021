import { executeCycle } from "./lib.ts";
import chalkin from "https://deno.land/x/chalkin/mod.ts";

const fishes = [
  [8, 6, 2, 4, 8, 1, 8, 3, 8, 4],
  [3, 7, 2, 5, 4, 7, 3, 3, 4, 3],
  [6, 6, 1, 8, 3, 4, 1, 8, 2, 7],
  [4, 5, 7, 3, 8, 2, 6, 6, 1, 6],
  [8, 3, 5, 7, 3, 2, 2, 1, 4, 2],
  [6, 8, 4, 6, 3, 5, 8, 3, 1, 7],
  [7, 2, 8, 6, 8, 8, 6, 1, 1, 2],
  [8, 1, 3, 8, 6, 8, 5, 1, 1, 7],
  [6, 1, 6, 1, 1, 2, 4, 2, 6, 7],
  [3, 8, 4, 8, 4, 1, 5, 3, 8, 3],
];

const states = [{ flashes: 0, fishes }];

function prettyPrint(fishes: number[][]): string {
  return fishes
    .map((line) => line.join(" ").replaceAll("0", chalkin.magenta("0")))
    .join("\n\n");
}

for (let x = 0; x < 100; x++) {
  console.clear();
  const newState = executeCycle(states[states.length - 1].fishes);
  states.push(newState);
  console.log(prettyPrint(newState.fishes));
  Deno.sleepSync(100);
}

console.log(
  `part1: ${states
    .flatMap((state) => state.flashes)
    .reduce((sum, flash) => flash + sum, 0)}`
);

while (true) {
  const newState = executeCycle(states[states.length - 1].fishes);
  console.log(prettyPrint(newState.fishes));
  Deno.sleepSync(100);
  console.clear();
  if (newState.flashes === 100) {
    break;
  }
  states.push(newState);
}

console.log(`part2: ${states.length}`);
