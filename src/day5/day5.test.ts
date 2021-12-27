import { assertArrayIncludes, assertEquals } from "../../deps.ts";
import {
  findNumberOfCrossings,
  generatePointsFrom,
  Line,
  parseLines,
  Point,
} from "./lib.ts";

Deno.test({
  name: "That it parses string as Lines",
  fn() {
    assertEquals(parseLines(["0,9 -> 1,9", "8,0 -> 0,8"]), [
      { start: Point.of(9, 0), end: Point.of(9, 1) },
      { start: Point.of(0, 8), end: Point.of(8, 0) },
    ] as Line[]);
  },
});

Deno.test({
  name: "that it generates the points from the coordinates",
  async fn(test) {
    await test.step("that it generates from y", () => {
      assertEquals(
        [...generatePointsFrom(Point.of(1, 1), Point.of(3, 1))].length,
        3,
      );
      assertArrayIncludes([
        ...generatePointsFrom(Point.of(1, 1), Point.of(3, 1)),
      ], [
        Point.of(1, 1),
        Point.of(2, 1),
        Point.of(3, 1),
      ]);
    });

    await test.step("that it generates from x", () => {
      assertEquals(
        [...generatePointsFrom(Point.of(7, 9), Point.of(7, 7))].length,
        3,
      );
      assertArrayIncludes([
        ...generatePointsFrom(Point.of(7, 9), Point.of(7, 7)),
      ], [
        Point.of(7, 9),
        Point.of(7, 8),
        Point.of(7, 7),
      ]);
    });
  },
});

Deno.test({
  name: "that it generates diagonals points",
  fn() {
    assertEquals([...generatePointsFrom(Point.of(1, 1), Point.of(3, 3))], [
      Point.of(1, 1),
      Point.of(2, 2),
      Point.of(3, 3),
    ] as Point[]);

    assertEquals([...generatePointsFrom(Point.of(9, 7), Point.of(7, 9))], [
      Point.of(9, 7),
      Point.of(8, 8),
      Point.of(7, 9),
    ]);
  },
});

Deno.test({
  name: "that it finds 5 crossings",
  fn() {
    assertEquals(
      findNumberOfCrossings([
        { start: Point.of(9, 0), end: Point.of(9, 5) },
        { start: Point.of(4, 9), end: Point.of(4, 3) },
        { start: Point.of(2, 2), end: Point.of(1, 2) },
        { start: Point.of(0, 7), end: Point.of(4, 7) },
        { start: Point.of(9, 0), end: Point.of(9, 2) },
        { start: Point.of(4, 3), end: Point.of(4, 1) },
      ]),
      5,
    );
  },
});

Deno.test({name: 'that it compute 12 crossings (with diagonals)', fn() {
  assertEquals(findNumberOfCrossings([
{start: Point.of(9,0), end: Point.of(9,5)},
{start: Point.of(0,8), end: Point.of(8,0)},
{start: Point.of(4,9), end: Point.of(4,3)},
{start: Point.of(2,2), end: Point.of(1,2)},
{start: Point.of(0,7), end: Point.of(4,7)},
{start: Point.of(4,6), end: Point.of(0,2)},
{start: Point.of(9,0), end: Point.of(9,2)},
{start: Point.of(4,3), end: Point.of(4,1)},
{start: Point.of(0,0), end: Point.of(8,8)},
{start: Point.of(5,5), end: Point.of(2,8)},
  ]), 12)
}})
