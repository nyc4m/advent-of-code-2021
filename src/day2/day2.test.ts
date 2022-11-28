import { assertEquals } from "../../deps.ts";
import {
  Move,
  parseSubmarineMoves,
  sumMoves,
  sumMovesUsingAim,
} from "./lib.ts";

[
  { input: "forward 10", expected: { direction: "forward", value: 10 } },
  { input: "up 2", expected: { direction: "up", value: 2 } },
  { input: "down 3", expected: { direction: "down", value: 3 } },
].forEach((c) => {
  Deno.test(
    `that "${c.input}" will register as ${JSON.stringify(c.expected)}`,
    () => {
      assertEquals(parseSubmarineMoves(c.input), c.expected);
    },
  );
});

Deno.test("that it sums all moves", () => {
  const up: Move = { direction: "up", value: 3 };
  const down: Move = { direction: "down", value: 2 };
  const forward: Move = { direction: "forward", value: 10 };
  assertEquals(sumMoves([up, down, forward]), { x: 10, y: -1 });
});

Deno.test("that it should sum moves using aim", () => {
  const up: Move = { direction: "up", value: 3 };
  const down: Move = { direction: "down", value: 2 };
  const forward: Move = { direction: "forward", value: 10 };
  assertEquals(sumMovesUsingAim([up, down, forward]), { x: 10, y: -10 });
});
