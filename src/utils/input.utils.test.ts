import {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertThrows,
} from "../../deps.ts";
import { mapToNumbers, readInputFor, splitByLines } from "./input.utils.ts";
Deno.test("that it throws if the input file doesn't exist", () => {
  Deno.readTextFile = () => Promise.reject(new Error("testing"));

  assertRejects(
    () => readInputFor("day1"),
    Error,
    "Cannot read the input for day1 (reason: 'testing')",
  );
});

Deno.test("that it splits every lines", () => {
  const content = "aaaaa\nb\nccccccccc";
  assertArrayIncludes(splitByLines(content), ["aaaaa", "b", "ccccccccc"]);
});

Deno.test("that it parses strings to numbers", () => {
  const numbers = ["3", "34", "67"];
  assertArrayIncludes(mapToNumbers(numbers), [3, 34, 67]);
});

Deno.test("that it throws an error when a number is NaN", () => {
  const numbers = ["1", "hello"];

  assertThrows(
    () => mapToNumbers(numbers),
    Error,
    "'hello' is not a number, please verify the input",
  );
});

Deno.test("that readFile accepts operators", async () => {
  Deno.readTextFile = () => Promise.resolve("hello");

  assertEquals(await readInputFor("day1", () => 1), 1);
  assertEquals(
    await readInputFor(
      "day1",
      () => 1,
      () => "world",
    ),
    "world",
  );
  assertEquals(
    await readInputFor(
      "day1",
      () => 1,
      () => "world",
      () => ({
        hello: "world",
      }),
    ),
    { hello: "world" },
  );
});
