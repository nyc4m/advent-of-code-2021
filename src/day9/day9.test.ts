import { assertEquals } from "../../deps.ts";
import {
  computeRisk,
  exploreBasin,
  findLowestPoints,
  neighboursFrom,
  saveLowestPointPosition,
} from "./lib.ts";

Deno.test({
  name: "that it generates all the neighbours values",
  fn() {
    const heightMap = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    assertEquals(
      Array.from(neighboursFrom(heightMap, 1, 1)).sort(),
      [2, 4, 6, 8].sort()
    );
  },
});

Deno.test({
  name: "that it returns maxInt when the neighbours does not exists",
  fn() {
    const heightMap = [
      [1, 0, 3],
      [4, 5, 6],
      [7, 8, 0],
    ];
    assertEquals(
      Array.from(neighboursFrom(heightMap, 2, 2)).sort(),
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 8, 6].sort()
    );
  },
});

Deno.test({
  name: "that it computes the risk of a height map",
  fn() {
    assertEquals(
      findLowestPoints(
        [
          [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
          [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
          [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
          [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
          [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
        ],
        computeRisk()
      ),
      15
    );
  },
});

Deno.test({
  name: "that it returns lowest points",
  fn() {
    assertEquals(
      findLowestPoints(
        [
          [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
          [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
          [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
          [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
          [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
        ],
        saveLowestPointPosition()
      ),
      [
        { y: 0, x: 1 },
        { y: 0, x: 9 },
        { y: 2, x: 2 },
        { y: 4, x: 6 },
      ]
    );
  },
});

[
  {
    input: { y: 0, x: 1 },
    expected: [1, 2, 3].sort(),
  },
  {
    input: { y: 2, x: 2 },
    expected: [8, 7, 8, 8, 5, 6, 7, 8, 8, 7, 6, 7, 8, 8].sort(),
  },
  {
    input: { y: 4, x: 6 },
    expected: [8, 6, 7, 8, 6, 5, 6, 7, 8].sort(),
  },
].forEach(({ input: { y, x }, expected }) => {
  Deno.test({
    name: `that it explores basin at y=${y} & x=${x}`,
    fn() {
      assertEquals(
        exploreBasin(
          [
            [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
            [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
            [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
            [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
            [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
          ],
          y,
          x
        ).sort(),
        expected
      );
    },
  });
});
