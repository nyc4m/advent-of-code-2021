import { assertEquals } from "../../deps.ts";
import {
  computeRate,
  computingGazRating,
  createBinary,
  leastFrequent,
  mostFrequent,
} from "./lib.ts";

Deno.test("that it parses binary numbers", async (t) => {
  const input = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  await t.step("that 00100 renders to number array [0, 0, 1, 0, 0]", () => {
    assertEquals(createBinary("00100"), ["0", "0", "1", "0", "0"]);
  });

  await t.step(
    "that 00100 renders to string array [0, 0, 1, 0, 0, 1, 0, 0]",
    () => {
      assertEquals(createBinary("00100100"), [
        "0",
        "0",
        "1",
        "0",
        "0",
        "1",
        "0",
        "0",
      ]);
    },
  );

  const parsedBinary = input.map((c) => createBinary(c));

  await t.step("that it returns 1 as the most frequent number", () => {
    assertEquals(mostFrequent(createBinary("1011110")), "1");
    assertEquals(mostFrequent(createBinary("011110011100")), "1");
  });

  await t.step("that it returns the least frequent number", () => {
    assertEquals(leastFrequent(createBinary("1000110")), "1");
    assertEquals(leastFrequent(createBinary("11111110111111")), "0");
  });

  await t.step("that it parses 22 as gamma", () => {
    assertEquals(computeRate(parsedBinary, mostFrequent), 22);
  });

  await t.step("that it parses 0 as epsilon", () => {
    assertEquals(computeRate(parsedBinary, leastFrequent), 9);
  });

  await t.step("that it only solve part2", () => {
    assertEquals(computingGazRating(parsedBinary, mostFrequent), 0b10111);

    assertEquals(computingGazRating(parsedBinary, leastFrequent), 0b01010);
  });
});
