import { assertEquals } from "../../deps.ts";
import { foldOnAxis, parsePoint, parseFold } from "./lib.ts";

Deno.test({
  name: "that it parses coordinates",
  fn() {
    assertEquals(parsePoint("34,78"), { x: 34, y: 78 });
  },
});

Deno.test({
  name: "that it folds according to y axis",
  fn() {
    assertEquals(foldOnAxis({ x: 0, y: 14 }, 7, "y"), { x: 0, y: 0 });
  },
});

Deno.test({
  name: "that it folds according to x axis",
  fn() {
    assertEquals(foldOnAxis({ x: 8, y: 4 }, 5, "x"), { x: 2, y: 4 });
  },
});

Deno.test({
  name: "that it parses fold instruction",
  fn() {
    assertEquals(parseFold("fold along x=13"), { axis: "x", value: 13 });
  },
});
