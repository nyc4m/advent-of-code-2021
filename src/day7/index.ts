import {
  bench,
  runBenchmarks,
} from "https://cdn.deno.land/std/versions/0.117.0/raw/testing/bench.ts";

import { mapToNumbers, readInputFor } from "../utils/input.utils.ts";
import { computeFuelForPosition, crabEngine, distance } from "./lib.ts";

const crabsPosition = await readInputFor(
  "day7",
  (input) => input.split(","),
  mapToNumbers,
);

const possiblePositions = crabsPosition.map((position) =>
  computeFuelForPosition(crabsPosition, position, distance)
);
console.log("part1: ", Math.min(...possiblePositions));

const possiblePositionsForCrab = crabsPosition.map((position) =>
  computeFuelForPosition(crabsPosition, position, crabEngine)
);
console.log("part2: ", Math.min(...possiblePositionsForCrab));
