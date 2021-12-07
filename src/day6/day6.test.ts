import { assertEquals } from "../../deps.ts";
import { createAquarium, simulateDays } from "./lib.ts";

Deno.test({
  name: "that after 18 simulation days it returns 26",
  fn() {
    assertEquals(simulateDays(18, [3, 4, 3, 1, 2]), 26);
  },
});

Deno.test("that after 80 simulation days it returns 5934", () => {
  assertEquals(simulateDays(80, [3, 4, 3, 1, 2]), 5934);
});

Deno.test("that it inintialize the aquarium", () => {
  assertEquals(
    createAquarium([3, 4, 3, 1, 2]),
    new Map([
      [-1, 0],
      [0, 0],
      [1, 1],
      [2, 1],
      [3, 2],
      [4, 1],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ])
  );
});
