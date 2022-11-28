import { assertArrayIncludes, assertEquals } from "../../deps.ts";
import { RiskMap, Submarine } from "./lib.ts";

const rawMap = `
    1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581
    `.trim().split("\n").map((line) => line.trim());
Deno.test({
  name: "that it creates a risk map",
  async fn(test) {
    const map = RiskMap.from(
      rawMap,
    );
    await test.step("that it fill the risk map", () => {
      assertEquals(map.size, 100);
    });

    await test.step("that it gets a value at specific coordinate", () => {
      assertEquals(map.get(4, 0), 7);
    });

    await test.step("that it returns neighboors from a given position", () => {
      assertEquals(
        Array.from(map.neighboorsFrom(0, 0)).length,
        2,
      );
      assertArrayIncludes(Array.from(map.neighboorsFrom(0, 0)), [
        { x: 0, y: 1, risk: 1 },
        { y: 0, x: 1, risk: 1 },
      ]);

      assertEquals(
        Array.from(map.neighboorsFrom(1, 1)).length,
        4,
      );
      assertArrayIncludes(
        Array.from(map.neighboorsFrom(1, 1)),
        [
          { y: 0, x: 1, risk: 1 },
          { y: 1, x: 0, risk: 1 },
          { y: 2, x: 1, risk: 1 },
          { y: 1, x: 2, risk: 8 },
        ],
      );

      assertEquals(Array.from(map.neighboorsFrom(0, 9)).length, 2);
      assertArrayIncludes(Array.from(map.neighboorsFrom(0, 9)), [
        { x: 8, y: 0, risk: 4 },
        { x: 9, y: 1, risk: 2 },
      ]);
    });
  },
});

Deno.test({
  name: "that it creates a submarine that explores the cave",
  async fn(test) {
    const submarine = Submarine.beginWithMap(RiskMap.from(rawMap));

    await test.step("that it initialize a submarine", () => {
      assertEquals(submarine.visited, []);
    });

    await test.step({
      name: "it starts at x=0 y=0",
      fn() {
        assertEquals(submarine.location, { x: 0, y: 0 });
      },
    });

    submarine.explore();
    await test.step({
      name: "that it goes to the less risky neighboor and mark it",
      fn() {
        assertEquals(submarine.location, { x: 1, y: 0 });
        assertEquals(submarine.risk, 1);
      },
    });

    submarine.explore();
    await test.step({
      name: "that it goes to the less risky neighboor and mark it",
      fn() {
        assertEquals(submarine.location, { x: 0, y: 1 });
        assertEquals(submarine.risk, 2);
      },
    });
  },
});
