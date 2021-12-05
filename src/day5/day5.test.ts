import { assertEquals } from "../../deps.ts";
import {
  computeAllPossibleCrossing,
  computeNumberOfCrossing,
  filterLinesForPart1,
  isBetween,
  Line,
  parseLines,
  rememberCrossedLines,
} from "./lib.ts";

Deno.test({
  name: "That it parses string as Lines",
  fn() {
    assertEquals(parseLines(["0,9 -> 1,9", "8,0 -> 0,8"]), [
      { x: 0, y: 9, x2: 1, y2: 9 },
      { x: 8, y: 0, x2: 0, y2: 8 },
    ] as Line[]);
  },
});

Deno.test({
  name: "that it filters every line where x != x2 and y != y2",
  fn() {
    assertEquals(
      filterLinesForPart1([
        { x: 0, y: 9, x2: 1, y2: 9 },
        { x: 8, y: 0, x2: 0, y2: 8 },
        { x: 5, y: 0, x2: 5, y2: 78 },
      ]),
      [
        { x: 0, y: 9, x2: 1, y2: 9 },
        { x: 5, y: 0, x2: 5, y2: 78 },
      ]
    );
  },
});

Deno.test({
  name: "that it finds a crossing",
  fn() {
    assertEquals(
      computeNumberOfCrossing(
        { x: 3, y: 4, x2: 1, y2: 4 },
        { x: 9, y: 4, x2: 3, y2: 4 }
      ),
      1
    );
  },
});

Deno.test({
  name: "that it finds 3 crossing",
  fn() {
    assertEquals(
      computeNumberOfCrossing(
        { x: 3, y: 4, x2: 1, y2: 4 },
        { x: 9, y: 4, x2: 3, y2: 4 }
      ) +
        computeNumberOfCrossing(
          { x: 7, y: 0, x2: 7, y2: 4 },
          { x: 9, y: 4, x2: 3, y2: 4 }
        ) +
        computeNumberOfCrossing(
          { x: 4, y: 0, x2: 4, y2: 5 },
          { x: 9, y: 4, x2: 3, y2: 4 }
        ),
      3
    );
  },
});

Deno.test({
  name: "that it find 0 crossing",
  fn() {
    assertEquals(
      computeNumberOfCrossing(
        { x: 2, y: 2, x2: 2, y2: 1 },
        { x: 0, y: 9, x2: 9, y2: 9 }
      ),
      0
    );
  },
});

Deno.test({
  name: "that it crosses horizontaly",
  fn() {
    assertEquals(
      computeNumberOfCrossing(
        { x: 9, y: 4, x2: 3, y2: 4 },
        { x: 7, y: 0, x2: 7, y2: 4 }
      ),
      1
    );
  },
});

Deno.test({
  name: "that 1 is between 0 and 2",
  fn() {
    assertEquals(isBetween(1, 0, 2), true);
  },
});

Deno.test({
  name: "that -1 is outside 0 and 2",
  fn() {
    assertEquals(isBetween(-1, 0, 2), false);
  },
});

Deno.test({
  name: "that it can compute multiple crossing points",
  fn() {
    const line1 = { x: 0, y: 9, x2: 2, y2: 9 };
    const line2 = { x: 0, y: 9, x2: 5, y2: 9 };
    assertEquals(computeNumberOfCrossing(line1, line2), 3);
    assertEquals(computeNumberOfCrossing(line2, line2), 5);
    assertEquals(
      computeNumberOfCrossing({ x: 1, y: 9, x2: 3, y2: 9 }, line2),
      3
    );
  },
});

Deno.test({
  name: "that it doesn't compute 2 times the same crossing",
  fn() {
    const line1 = { x: 3, y: 4, x2: 1, y2: 4 };
    const line2 = { x: 9, y: 4, x2: 3, y2: 4 };
    assertEquals(
      rememberCrossedLines(line1, line2) + rememberCrossedLines(line2, line1),
      1
    );
  },
});

Deno.test({
  name: "that it compute 5 (aoc example)",
  fn() {
    const lines = filterLinesForPart1(
      parseLines(
        `0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2`.split("\n")
      )
    );
    assertEquals(computeAllPossibleCrossing(lines), 5);
  },
});
