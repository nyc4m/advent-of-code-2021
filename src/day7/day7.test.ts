import { assertEquals } from "../../deps.ts";
import { computeFuelForPosition, crabEngine, distance } from "./lib.ts";

const positionsSample: ReadonlyArray<number> = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

Deno.test({
  name: "that it should find 37 fuel for position 2 (aoc example)",
  fn() {
    assertEquals(computeFuelForPosition(positionsSample, 2, distance), 37);
  },
});

Deno.test({
  name: "that it should find 168 fuel for position 5 for crabs engine (aoc example)",
  fn() {
    assertEquals(computeFuelForPosition(positionsSample, 5, crabEngine), 168);
  },
});

Deno.test({
  name: "that it compute 66 fuel from 16 to 5 using crab engine",
  fn() {
    assertEquals(crabEngine(16, 5), 66);
  },
});
