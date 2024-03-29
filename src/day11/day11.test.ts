import { assertEquals } from "../../deps.ts";
import { executeCycle } from "./lib.ts";

Deno.test({
  name: "that it increments all fish",
  fn() {
    assertEquals(
      executeCycle([
        [1, 1, 1, 1, 1],
        [1, 8, 8, 8, 1],
        [1, 8, 1, 8, 1],
        [1, 8, 8, 8, 1],
        [1, 1, 1, 1, 1],
      ]).fishes,
      [
        [2, 2, 2, 2, 2],
        [2, 9, 9, 9, 2],
        [2, 9, 2, 9, 2],
        [2, 9, 9, 9, 2],
        [2, 2, 2, 2, 2],
      ],
    );
  },
});

Deno.test({
  name: "that it flashes",
  fn() {
    assertEquals(
      executeCycle([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 9, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]).fishes,
      [
        [2, 2, 2, 2, 2],
        [2, 3, 3, 3, 2],
        [2, 3, 0, 3, 2],
        [2, 3, 3, 3, 2],
        [2, 2, 2, 2, 2],
      ],
    );
  },
});

[
  {
    name: "top left corner",
    input: [
      [9, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    expected: [
      [0, 3, 2, 2, 2],
      [3, 3, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
    ],
  },
  {
    name: "left edge",
    input: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [9, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    expected: [
      [2, 2, 2, 2, 2],
      [3, 3, 2, 2, 2],
      [0, 3, 2, 2, 2],
      [3, 3, 2, 2, 2],
      [2, 2, 2, 2, 2],
    ],
  },
  {
    name: "right edge",
    input: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 9],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    expected: [
      [2, 2, 2, 2, 2],
      [2, 2, 2, 3, 3],
      [2, 2, 2, 3, 0],
      [2, 2, 2, 3, 3],
      [2, 2, 2, 2, 2],
    ],
  },
  {
    name: "bottom right corner",
    input: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 9],
    ],
    expected: [
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 3, 3],
      [2, 2, 2, 3, 0],
    ],
  },
].forEach(({ name, input, expected }) => {
  Deno.test({
    name: `that it flashes on ${name}`,
    fn() {
      assertEquals(executeCycle(input).fishes, expected);
    },
  });
});

Deno.test({
  name: "that it doesn't power fishes that are flashing",
  fn() {
    assertEquals(
      executeCycle([
        [1, 1, 1, 1, 1],
        [1, 1, 9, 9, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]).fishes,
      [
        [2, 3, 4, 4, 3],
        [2, 3, 0, 0, 3],
        [2, 3, 4, 4, 3],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ],
    );
  },
});

[
  {
    name: "only 2 flash",
    input: [
      [1, 1, 1, 1, 1],
      [1, 1, 9, 8, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    expected: [
      [2, 3, 4, 4, 3],
      [2, 3, 0, 0, 3],
      [2, 3, 4, 4, 3],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2],
    ],
  },
  {
    name: "bunch of flash",
    input: [
      [1, 1, 1, 1, 1],
      [1, 9, 9, 9, 1],
      [1, 9, 1, 9, 1],
      [1, 9, 9, 9, 1],
      [1, 1, 1, 1, 1],
    ],
    expected: [
      [3, 4, 5, 4, 3],
      [4, 0, 0, 0, 4],
      [5, 0, 0, 0, 5],
      [4, 0, 0, 0, 4],
      [3, 4, 5, 4, 3],
    ],
  },
  {
    name: "after all flashes",
    input: [
      [3, 4, 5, 4, 3],
      [4, 0, 0, 0, 4],
      [5, 0, 0, 0, 5],
      [4, 0, 0, 0, 4],
      [3, 4, 5, 4, 3],
    ],
    expected: [
      [4, 5, 6, 5, 4],
      [5, 1, 1, 1, 5],
      [6, 1, 1, 1, 6],
      [5, 1, 1, 1, 5],
      [4, 5, 6, 5, 4],
    ],
  },
  {
    name: "from aoc",
    input: [
      [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
      [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
      [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
      [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
      [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
      [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
      [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
      [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
      [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
      [6, 3, 9, 4, 8, 6, 2, 6, 3, 7],
    ],
    expected: [
      [8, 8, 0, 7, 4, 7, 6, 5, 5, 5],
      [5, 0, 8, 9, 0, 8, 7, 0, 5, 4],
      [8, 5, 9, 7, 8, 8, 9, 6, 0, 8],
      [8, 4, 8, 5, 7, 6, 9, 6, 0, 0],
      [8, 7, 0, 0, 9, 0, 8, 8, 0, 0],
      [6, 6, 0, 0, 0, 8, 8, 9, 8, 9],
      [6, 8, 0, 0, 0, 0, 5, 9, 4, 3],
      [0, 0, 0, 0, 0, 0, 7, 4, 5, 6],
      [9, 0, 0, 0, 0, 0, 0, 8, 7, 6],
      [8, 7, 0, 0, 0, 0, 6, 8, 4, 8],
    ],
  },
].forEach(({ name, input, expected }) => {
  Deno.test({
    name:
      `that it if a flashing fish causes an other fish to flash, it also flashes during this turn (${name})`,
    fn() {
      assertEquals(executeCycle(input).fishes, expected);
    },
  });
});

Deno.test({
  name: "that it computes the numbers of flashes",
  fn() {
    assertEquals(
      executeCycle([
        [1, 1, 1, 1, 1],
        [1, 9, 9, 9, 1],
        [1, 9, 1, 9, 1],
        [1, 9, 9, 9, 1],
        [1, 1, 1, 1, 1],
      ]).flashes,
      9,
    );
  },
});
