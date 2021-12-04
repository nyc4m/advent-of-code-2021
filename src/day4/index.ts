import { readInputFor, splitByLines } from "../utils/input.utils.ts";
import { createGame } from "./lib.ts";

const input = await readInputFor("day4", splitByLines);

const { boards, numbers } = createGame(input);

for (const number of numbers) {
  boards.checkEvery(number);
  const winner = boards.checkWinners();
  if (winner !== 0) {
    console.log(`part1: ${boards.resultFor(winner)}`);
  }
}
