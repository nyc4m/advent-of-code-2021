import { assertArrayIncludes, assertEquals } from "../../deps.ts";
import {
  computeIncreases,
  computeWindows,
  intermediateDepthsSum,
} from "./lib.ts";

Deno.test("that it has increased 1 times", () => {
  assertEquals(computeIncreases([12, 13]), 1);
});

Deno.test("that it has not increased", () => {
  assertEquals(computeIncreases([12, 11]), 0);
});

Deno.test("that it has increased 7 times (from aoc)", () => {
  assertEquals(
    computeIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
    7,
  );
});

Deno.test("that it creates sliding windows of 3 (offset  1)", () => {
  assertArrayIncludes(Array.from(computeWindows([12, 23, 34, 678])), [
    [12, 23, 34],
    [23, 34, 678],
  ]);
});

Deno.test("that it's summing the windows", () => {
  assertArrayIncludes(
    Array.from(
      intermediateDepthsSum([
        [12, 23, 34],
        [23, 34, 678],
      ]),
    ),
    [12 + 23 + 34, 23 + 34 + 678],
  );
});
