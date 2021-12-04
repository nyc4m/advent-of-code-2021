import { Board, createGame, Point } from "./lib.ts";
import { assert, assertEquals } from "../../deps.ts";

import { Cell } from "./lib.ts";

Deno.test("that Input is parsed", async (t) => {
  const input = `1,2,3,4,5,6,7

1  2
6 7

14 15
18 19
`.split("\n");

  const parsed = createGame(input);

  await t.step("that it parses the first line as an array of numbers", () => {
    assertEquals(parsed.numbers, [1, 2, 3, 4, 5, 6, 7]);
  });

  await t.step("that it parses the rest of the file as boards", () => {
    assertEquals(
      parsed.boards,
      Board.empty()
        .put(Cell.notChecked(1, 0, 0, 1))
        .put(Cell.notChecked(1, 1, 0, 2))
        .put(Cell.notChecked(1, 0, 1, 6))
        .put(Cell.notChecked(1, 1, 1, 7))
        .put(Cell.notChecked(2, 0, 0, 14))
        .put(Cell.notChecked(2, 1, 0, 15))
        .put(Cell.notChecked(2, 0, 1, 18))
        .put(Cell.notChecked(2, 1, 1, 19))
    );
  });
});

Deno.test(
  "that it should check a location at the corresponding number on everyboard",
  () => {
    const board = Board.empty()
      .put(Cell.notChecked(1, 0, 0, 1996))
      .put(Cell.notChecked(1, 1, 0, 2))
      .put(Cell.notChecked(1, 0, 1, 6))
      .put(Cell.notChecked(1, 1, 1, 7))
      .put(Cell.notChecked(2, 0, 0, 1996))
      .put(Cell.notChecked(2, 1, 0, 15))
      .put(Cell.notChecked(2, 0, 1, 18))
      .put(Cell.notChecked(2, 1, 1, 1996));

    board.checkEvery(1996);

    assert(board.at(1, 0, 0).content.checked);
    assert(!board.at(1, 1, 0).content.checked);
    assert(board.at(2, 0, 0).content.checked);
    assert(board.at(2, 1, 1).content.checked);
  }
);

Deno.test("that board 1 should have won because it has a full line", () => {
  const board = Board.empty()
    .put(Cell.checked(1, 0, 0, 1996))
    .put(Cell.checked(1, 1, 0, 2))
    .put(Cell.notChecked(1, 0, 1, 6))
    .put(Cell.notChecked(1, 1, 1, 7))
    .put(Cell.notChecked(2, 0, 0, 1996))
    .put(Cell.notChecked(2, 1, 0, 15))
    .put(Cell.notChecked(2, 0, 1, 18))
    .put(Cell.notChecked(2, 1, 1, 1996));

  assertEquals(board.checkWinners(), 1);
});

Deno.test("that board 2 should have won because it has a full column", () => {
  const board = Board.empty()
    .put(Cell.notChecked(1, 0, 0, 1996))
    .put(Cell.notChecked(1, 1, 0, 2))
    .put(Cell.notChecked(1, 0, 1, 6))
    .put(Cell.notChecked(1, 1, 1, 7))
    .put(Cell.notChecked(2, 0, 0, 1996))
    .put(Cell.checked(2, 1, 0, 15))
    .put(Cell.notChecked(2, 0, 1, 18))
    .put(Cell.checked(2, 1, 1, 1996));

  assertEquals(board.checkWinners(), 2);
});

Deno.test("that board no board has won", () => {
  const board = Board.empty()
    .put(Cell.notChecked(1, 0, 0, 1996))
    .put(Cell.notChecked(1, 1, 0, 2))
    .put(Cell.notChecked(1, 0, 1, 6))
    .put(Cell.notChecked(1, 1, 1, 7))
    .put(Cell.notChecked(2, 0, 0, 1996))
    .put(Cell.notChecked(2, 1, 0, 15))
    .put(Cell.notChecked(2, 0, 1, 18))
    .put(Cell.checked(2, 1, 1, 1996));

  assertEquals(board.checkWinners(), 0);
});

Deno.test("should compute result for a given player", () => {
  const board = Board.empty()
    .put(Cell.checked(1, 0, 0, 1))
    .put(Cell.notChecked(1, 1, 0, 2))
    .put(Cell.notChecked(1, 0, 1, 10))
    .put(Cell.notChecked(1, 1, 1, 7));

  board.checkEvery(2);

  assertEquals(board.resultFor(1), (10 + 7) * 2);
});
